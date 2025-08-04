import { IsString,Length } from "class-validator";


export class GetTeamsDto{
    @IsString()
    @Length(1,20)
    competitionId:string;
}
