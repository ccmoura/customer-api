import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class UpdateCustomerDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d+$/)
  document: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
