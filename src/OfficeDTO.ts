import { IsDateString, IsString } from 'class-validator';

export interface OfficeDTO {

  lat : number;
  long : number;
  libele : string;
  caracteristique : string;

}
