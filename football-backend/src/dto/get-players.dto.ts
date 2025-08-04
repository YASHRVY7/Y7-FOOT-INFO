import { IsString, Length } from 'class-validator';

export class GetPlayersDto {
  @IsString()
  @Length(1, 20)
  teamId: string;
}
