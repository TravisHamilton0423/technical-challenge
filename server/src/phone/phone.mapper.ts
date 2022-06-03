import { Injectable } from '@nestjs/common';
import { PhoneDto } from './dtos/phone.dto';
import { Phone } from './phone.entity';
import { PhoneCreateDto } from './dtos/phone-create.dto';
import { PhoneUpdateDto } from './dtos/phone-update.dto';

@Injectable()
export class PhoneMapper {
  mapEntityToDto(phone: Phone): PhoneDto {
    return {
      id: phone.id,
      phoneNumber: phone.phoneNumber,
      phoneType: phone.phoneType,
    };
  }

  mapCreatePhoneDtoToEntity(dto: PhoneCreateDto): Phone {
    return {
      id: undefined,
      phoneNumber: dto.phoneNumber,
      phoneType: dto.phoneType,
    };
  }

  mapUpdatePhoneDtoToEntity(dto: PhoneUpdateDto): Phone {
    return {
      id: dto.id,
      phoneNumber: dto.phoneNumber,
      phoneType: dto.phoneType,
    };
  }
}
