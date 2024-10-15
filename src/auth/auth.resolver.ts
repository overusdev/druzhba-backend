// import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
// import { AuthService } from './auth.service';
// import { Auth } from './entities/auth.entity';
// import { LoginResponse } from './dto/login-response';
// import { LoginUserInput } from './dto/login-user.input';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from './gql-auth.guard';

// import { AuthInput } from './dto/auth.input';

// @Resolver(() => Auth)
// export class AuthResolver {
//   constructor(private readonly authService: AuthService) {}

//   @Mutation(() => LoginResponse)
//   @UseGuards(GqlAuthGuard)
//   login(
//     @Args('loginUserInput') loginUserInput: LoginUserInput,
//     @Context() context,
//   ) {
//     // return this.authService.login(loginUserInput);
//     return this.authService.login(context.user);
//   }
// }

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('authInput') authInput: AuthInput) {
    const user = await this.authService.validateUser(
      authInput.name,
      authInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
