import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserContext } from '../decorators/user.decorator';
import { JwtPayload } from '../types/jwt-payload.type';
import { SECRET_PROVIDER_NAME } from '../data/injection-names.data';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(SECRET_PROVIDER_NAME) private secret: string) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO: pass as parameter
      // defined from env ( prod, dev, local, ... )
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload): UserContext {
    return { id: payload.uuid };
  }
}
