import {IsDateString, IsDecimal, IsString} from 'class-validator';

export class Office {

  /**
   * latitude of the post office
   */
  @IsDecimal()
  lat: number;

  /**
   * latitude of the post office
   */
  @IsDecimal()
  long: number;

  /**
   * name of the post office
   */
  @IsString()
  libele: string;

  /**
   * type of the post office
   */
  @IsString()
  carcteristique: string;


  constructor(lat: number, long: number, libele: string, caracteristique: string) {
    this.lat = lat;
    this.long = long;
    this.libele = libele;
    this.carcteristique = caracteristique;
  }
}

export const compareWithTitle = (a: Office, b: Office): number => {
  return a.libele.localeCompare(b.libele);
};