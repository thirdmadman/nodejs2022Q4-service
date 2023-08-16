import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  CRYPT_SALT,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from 'src/common/config';
import { hash, compare, genSalt } from 'bcrypt';
import ms from 'ms';

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

  async getTokens(userId: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          login,
        },
        {
          expiresIn: TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          login,
        },
        {
          expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    const accessTokenAddTime = ms(TOKEN_EXPIRE_TIME);
    const refreshTokenAddTime = ms(TOKEN_REFRESH_EXPIRE_TIME);

    const currentTimestamp = new Date();

    const accessTokenExpiresAt = new Date().setMilliseconds(
      currentTimestamp.getMilliseconds() + accessTokenAddTime,
    );
    const refreshTokenExpiresAt = new Date().setMilliseconds(
      currentTimestamp.getMilliseconds() + refreshTokenAddTime,
    );

    const accessTokenExpiresIn = ms(TOKEN_EXPIRE_TIME);
    const refreshTokenExpiresIn = ms(TOKEN_REFRESH_EXPIRE_TIME);

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
