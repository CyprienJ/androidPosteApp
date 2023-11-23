
export interface OfficeDTO {
  type: string;
  id : string;
  geometry : object;
  properties : PropertiesType;
}

export interface PropertiesType{
  precision_du_geocodage : string;
  latitude : number;
  numero_de_telephone : string;
  _i : number;
  caracteristique_du_site : string;
  libelle_du_site : string;
  longitude : number;
  pays : string;
  _id : string;
}

export interface DataSetDTO {
  type : string;
  total : string;
  features : Array<OfficeDTO>;
  bbox : string;
}
