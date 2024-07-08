import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configs/app.config';
import { SurveysModule } from './surveys/surveys.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      playground: true,
      formatError(error) {
        const { message, extensions } = error;

        console.error(
          'Graphql Error occured',
          JSON.stringify(error, null, '\t'),
        );

        return {
          message,
          // eslint-disable-next-line
          // @ts-ignore
          code: extensions?.response?.statusCode || extensions?.code,
        };
      },
    }),
    SurveysModule,
  ],
})
export class AppModule {}
