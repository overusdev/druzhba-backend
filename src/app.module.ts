import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from './pets/pets.module';
import { join } from 'path';

console.log('process.env.MYSQL_DB_USER', process.env.MYSQL_DB_USER);
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '1955',
    //   database: 'test_db',
    //   entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    //   synchronize: true,
    //   logging: ['query', 'error'],
    // }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
