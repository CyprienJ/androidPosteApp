import { Injectable, OnModuleInit } from '@nestjs/common';
import { Office, compareWithTitle } from './Office';
import { readFile } from 'fs/promises';
import { HttpService } from '@nestjs/axios';
import { first, firstValueFrom, map, tap } from 'rxjs';
import { OfficeDTO, PropertiesType, DataSetDTO } from './OfficeDTO';

@Injectable()
export class OfficeService implements OnModuleInit {
  private readonly storage = new Map<string, Office>();

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    await this.loadOfficesFromFile();
    console.log(`Storage contains ${this.storage.size} offices`);
  }
  private async loadOfficesFromFile(){
    const data = await readFile('src/laposte-poincont2.json');
    const test: DataSetDTO = JSON.parse(data.toString());
    const offices : Array<OfficeDTO> = test.features;
    offices.forEach((properties) => this.addOffice({
      lat : properties.properties.latitude,
      long : properties.properties.longitude,
      libele : properties.properties.libelle_du_site,
      carcteristique : properties.properties.caracteristique_du_site,
    }))

  }
  addOffice(office: Office) {
    this.storage.set(office.libele, office);
  }

  getOffice(libele: string): Office {
    const office = this.storage.get(libele);
    if (!office) {
      throw new Error(`Office named ${libele} not found`);
    }
    return office;
  }

  getAllOffices(): Array<Office> {
    return Array.from(this.storage.values()).sort(compareWithTitle);
  }

  displayAllOffices(): void{
    let array : Array<Office> = Array.from(this.storage.values()).sort(compareWithTitle);
    for (let i = 0; i < array.length; i++) {
      console.log(array[i].libele);
    }
  }

  getOfficesOfCaracteristique(caracteristique: string): Array<Office> {
    console.log(caracteristique);
    return this.getAllOffices()
        .filter((office) => office.carcteristique === caracteristique)
        .sort(compareWithTitle);
  }

  getTotalNumberOfOffices(): number {
    return this.storage.size;
  }

  delete(libele: string) {
    this.storage.delete(libele);
  }

}
