import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PhoneType } from 'src/phone/enums/phone-type.enum';

export class PhoneUpdateDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(PhoneType)
  phoneType: PhoneType;
}
