import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => {
        return {
          server: {
            context: ({ req }) => {
              return {
                authorization: `${req.headers.authorization}`,
              };
            },
            playground: true,
          },
          gateway: {
            buildService: ({ url }) => {
              return new RemoteGraphQLDataSource({
                url,
                willSendRequest({ context, request }) {
                  request.http.headers.set(
                    'authorization',
                    context.authorization,
                  );
                },
              });
            },
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                {
                  name: 'notifications',
                  url: configService.get<URL>('gql.notificationsServiceUrl')
                    .href,
                },
                {
                  name: 'surveys',
                  url: configService.get<URL>('gql.surveysServiceUrl').href,
                },
              ],
              pollIntervalInMs: 1000,
            }),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class GatewayModule {}
