import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PhoneType } from './enums/phone-type.enum';
import { Contact } from 'src/contact/contact.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  phoneType: PhoneType;

  @ManyToOne(() => Contact, (contact) => contact.phoneNumbers, { onDelete: "CASCADE", onUpdate:'CASCADE' })
  contact?: Contact;
}
