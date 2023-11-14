import { IsNotEmpty } from 'class-validator';

export class RequestTokenDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly mot_de_passe: string;
}
