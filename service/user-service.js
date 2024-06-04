const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const TokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const API_Error = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw API_Error.BadRequest("Candidate already registered");
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({ email, password: hashPassword });

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw API_Error.BadRequest("User not found");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw API_Error.BadRequest("Incorect password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw API_Error.UnauthorizedUser();
    }
  }
}

module.exports = new UserService();
