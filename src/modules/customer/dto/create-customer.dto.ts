import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d+$/)
  document: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
