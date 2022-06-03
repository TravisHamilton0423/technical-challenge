import { ArrayUnique, IsEmail, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { PhoneUpdateDto } from '../../phone/dtos/phone-update.dto';

export class ContactUpdateDto {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  emailAddress: string;

  @IsOptional()
  @ValidateNested()
  @ArrayUnique(phoneNumber => phoneNumber.phoneType)
  phoneNumbers: PhoneUpdateDto[]
}
