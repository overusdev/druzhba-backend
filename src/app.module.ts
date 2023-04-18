import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from './pets/pets.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1955',
      database: 'test_db',
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
