import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './dto/JWTPAYloadInterface';
import { User } from 'src/user/schemas/user.schema';


@Injectable()
export class AuthService {
  
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createToken(email: string) {
    const user: JwtPayload = { email };
    const token = this.jwtService.sign(user);
    const role = await this.userService.findRoleByEmail(email);
    // const vraitoken = this.jwtService.sign(role);

    return {
      expiresIn: 3600,
      token,
      role,
      // vraitoken
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.userService.findByEmail(payload.email);
  }

  public async validatedUser(user: any): Promise<User> {
    try {
      const existedUser: User = await this.userService.findByCredentials(user.email, user.mot_de_passe);
      return existedUser || null;
    } catch (err) {
      return null;
    }
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
