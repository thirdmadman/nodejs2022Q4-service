import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  CRYPT_SALT,
  JWT_SECRET_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from 'src/common/config';
import { hash, compare, genSalt } from 'bcrypt';

import ms, { type StringValue } from 'ms';
import { RefreshDto } from './dto/refresh.dto';
import { v4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(authDTO: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { login: authDTO.login },
    });

    if (user) {
      return {
        isError: true,
        error: 'User with this login already exists',
      };
    }

    const currentTimestamp = new Date();

    const salt = await genSalt(Number(CRYPT_SALT));
    const hashPassword = await hash(authDTO.password, salt);

    const createdUser = await this.prisma.user.create({
      data: {
        login: authDTO.login,
        password: hashPassword,
        version: 1,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      },
    });

    if (!createdUser) return null;

    const convertedUser = {
      ...createdUser,
      createdAt: createdUser.createdAt.getTime(),
      updatedAt: createdUser.updatedAt.getTime(),
    };

    return {
      entity: new UserEntity(convertedUser),
    };
  }

  async signIn(authDTO: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { login: authDTO.login },
    });

    if (!user) {
      return null;
    }

    const match = await compare(authDTO.password, user.password);

    if (!match) {
      return null;
    }

    return await this.getTokens(user.id, user.login);
  }

  async refresh(req: Request, refreshDTO: RefreshDto) {
    const { refreshToken } = refreshDTO;
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: JWT_SECRET_KEY,
    });

    if (!payload) {
      return null;
    }

    const newToken = await this.generateAccessToken(
      payload['userId'],
      payload['login'],
      payload['tokenUUID'],
    );

    const accessTokenAddTime = ms(TOKEN_EXPIRE_TIME as StringValue);
    const currentTimestamp = new Date().getMilliseconds();

    const accessTokenExpiresAt = new Date().setMilliseconds(
      currentTimestamp + accessTokenAddTime,
    );

    const accessTokenExpiresIn = ms(TOKEN_EXPIRE_TIME as StringValue);

    return {
      accessToken: newToken,
      accessTokenExpiresAt,
      accessTokenExpiresIn,
    };
  }

  async generateAccessToken(userId: string, login: string, tokenUUID: string) {
    return await this.jwtService.signAsync(
      {
        userId,
        login,
        tokenUUID,
      },
      {
        expiresIn: TOKEN_EXPIRE_TIME,
      },
    );
  }

  async getTokens(userId: string, login: string) {
    const tokenUUID = v4();

    const accessToken = await this.generateAccessToken(
      userId,
      login,
      tokenUUID,
    );

    const refreshToken = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          login,
          tokenUUID,
        },
        {
          expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    const accessTokenAddTime = ms(TOKEN_EXPIRE_TIME as StringValue);
    const refreshTokenAddTime = ms(TOKEN_REFRESH_EXPIRE_TIME as StringValue);

    const currentTimestamp = new Date().getMilliseconds();

    const accessTokenExpiresAt = new Date().setMilliseconds(
      currentTimestamp + accessTokenAddTime,
    );
    const refreshTokenExpiresAt = new Date().setMilliseconds(
      currentTimestamp + refreshTokenAddTime,
    );

    const accessTokenExpiresIn = ms(TOKEN_EXPIRE_TIME as StringValue);
    const refreshTokenExpiresIn = ms(TOKEN_REFRESH_EXPIRE_TIME as StringValue);

    return {
      accessToken,
      accessTokenExpiresAt,
      accessTokenExpiresIn,
      refreshToken,
      refreshTokenExpiresAt,
      refreshTokenExpiresIn,
    };
  }
}
