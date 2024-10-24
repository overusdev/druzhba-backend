import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { protectToken } from 'src/common/helpers/protectToken';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this._userService.findOneByPhone(data.phone);
    const validPassword = compareSync(data.password, user.bcryptpassword);

    if (!validPassword) {
      throw new UnauthorizedException('Incorect Password');
    } else {
      console.log('GOOD! Y are Auth!');
    }

    const getToken = await this.jwtToken(user);
    const token = getToken ? protectToken({ apiToken: getToken }) : undefined;

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = {
      username: user.name,
      sub: user.id,
      isAdmin: user.isAdmin,
    };

    return this._jwtService.signAsync(payload);
  }
}
