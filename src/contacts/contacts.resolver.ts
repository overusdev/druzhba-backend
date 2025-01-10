import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Contact)
  createContact(
    @Args('createContactInput') createContactInput: CreateContactInput,
  ) {
    return this.contactsService.create(createContactInput);
  }

  @Query(() => Contact, { name: 'contact' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contactsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Contact)
  async updateContact(
    @Args('updateContactInput') updateContactInput: UpdateContactInput,
  ): Promise<Contact> {
    return await this.contactsService.update(updateContactInput);
  }
}
