import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsResolver } from './docs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doc } from './entities/doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doc])],
  providers: [DocsResolver, DocsService],
})
export class DocsModule {}
