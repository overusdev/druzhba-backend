import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
@Resolver('Auth')
export class AuthResolver {
  constructor(private _authService: AuthService) {}

  @Mutation(() => AuthType)
  public async login(
    @Args('data') data: AuthInput,
    @Context('res') res: any,
  ): Promise<AuthType> {
    const response = await this._authService.validateUser(data);
    const expires = new Date(Date.now() + 150 * 24 * 60 * 60 * 1000);

    res.cookie('dr', response.token, {
      httpOnly: true,
      path: '/',
    });
    return {
      user: response.user,
      token: response.token,
    };
  }
}
