import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindCustomerByIdDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
