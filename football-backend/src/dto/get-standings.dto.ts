import { IsString, Length } from 'class-validator';

export class GetStandingsDto {
    @IsString()
    @Length(1, 20)
    competitionId: string;
}
