import { Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  create(createContactInput: CreateContactInput): Promise<Contact> {
    const newContact = this.contactRepository.create(createContactInput);

    return this.contactRepository.save(newContact);
  }

  async findOne(id): Promise<Contact> {
    return this.contactRepository.findOneBy({ id: id });
  }

  async update(updateContactInput: UpdateContactInput): Promise<Contact> {
    await this.contactRepository.update(
      { id: updateContactInput.id },
      { ...updateContactInput },
    );
    return await this.findOne(updateContactInput.id);
  }
}
