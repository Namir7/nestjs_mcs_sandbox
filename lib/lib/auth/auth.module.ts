import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SECRET_PROVIDER_NAME } from './data/injection-names.data';

type RegisterOptions = {
  secret: string;
};

@Module({})
export class AuthModule {
  static register(options: RegisterOptions): DynamicModule {
    return {
      imports: [
        JwtModule.register({
          secret: options.secret,
        }),
      ],
      module: AuthModule,
      providers: [
        { provide: SECRET_PROVIDER_NAME, useValue: options.secret },
        JwtStrategy,
      ],
    };
  }
}
