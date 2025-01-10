import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from './pets/pets.module';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { AdsModule } from './ads/ads.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { DocsModule } from './docs/docs.module';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // context: ({ req }) => ({ req }), // For graphQL to have access to requests since auth has been implemented.
      context: ({ req, res }) => ({ req, res }), // For graphQL to have access to requests since auth has been implemented.
      cors: {
        credentials: true,
        origin: true,
      },
      // playground: process.env.NODE_ENV === 'production' ? false : true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      logging: ['query', 'error'],
    }),
    PetsModule,
    UsersModule,
    NewsModule,
    AdsModule,
    AuthModule,
    ContactsModule,
    DocsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
