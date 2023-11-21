import { Injectable, OnModuleInit } from '@nestjs/common';
import { Office, compareWithTitle } from './Office';
import { readFile } from 'fs/promises';
import { HttpService } from '@nestjs/axios';
import { first, firstValueFrom, map, tap } from 'rxjs';
import { OfficeDTO } from './OfficeDTO';

@Injectable()
export class OfficeService implements OnModuleInit {
  private readonly storage = new Map<string, Office>();

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    console.log(`Storage contains ${this.storage.size} offices`);
  }

  private async loadBooksFromFile() {
    const data = await readFile('src/dataset.json');
    const offices: Array<Office> = JSON.parse(data.toString());
    offices.forEach((office) => this.addBook(office));
  }

  private async loadBooksFromServer(): Promise<void> {
    return firstValueFrom(
      this.httpService.get('https://api.npoint.io/fbb2a6039fc21e320b30').pipe(
        map((response) => response.data),
        tap((offices: OfficeDTO[]) => {
          offices.forEach((office) =>
            this.addBook({
              lat: office.lat,
              long: office.long,
              libele: office.libele,
              carcteristique: office.caracteristique,
            }),
          );
        }),
        map(() => undefined),
      ),
    );
  }

  addBook(office: Office) {
    this.storage.set(office.libele, office);
  }

  getBook(libele: string): Office {
    const book = this.storage.get(libele);
    if (!book) {
      throw new Error(`Office named ${libele} not found`);
    }
    return book;
  }

  getAllBooks(): Array<Office> {
    return Array.from(this.storage.values()).sort(compareWithTitle);
  }

  getBooksOfCaracteristique(caracteristique: string): Array<Office> {
    return this.getAllBooks()
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
