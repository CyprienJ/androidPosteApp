import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { OfficeModule } from '../src/office.module';

describe('Office API', () => {
  let app: INestApplication;
  let httpRequester: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OfficeModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    httpRequester = request(app.getHttpServer());
  });

  it(`/GET offices`, async () => {
    const response = await httpRequester.get('/offices').expect(200);

    expect(response.body).toEqual(expect.any(Array));
  });

  it(`/POST office`, async () => {
    const response = await httpRequester
      .post('/offices')
      .send({
        lat: 0,
        long: 0,
        libele: 'name of the office',
        caracteristique: 'a type of office',
      })
      .expect(201);

    expect(response.body).toEqual({
      lat: 0,
      long: 0,
      libele: 'name of the office',
      caracteristique: 'a type of office',
    });
  });

  it(`/GET offices/:libele`, async () => {
    // First prepare the data by adding a book
    await httpRequester.post('/offices').send({
      lat: 0,
      long: 0,
      libele: 'name_of_the_office',
      caracteristique: 'a type of office',
    });

    // Then get the previously stored book
    const response = await httpRequester.get('/offices/name_of_the_office').expect(200);

    expect(response.body).toMatchObject({
      lat: 0,
      long: 0,
      libele: 'name_of_the_office',
      caracteristique: 'a type of office',
    });
  });

  it(`/GET office by type`, async () => {


    // Then get the previously stored book
    const response = await httpRequester
      .get('/offices')
      .query({ caracteristique: "Bureau de Poste" })
      .expect(200);

    expect(response.body).toMatchObject([
      {
        lat: 45.9598,
        long: 5.3582,
        libele: "AMBERIEU EN BUGEY",
        caracteristique: "Bureau de Poste"
      },
      {
        lat: 45.99639,
        long: 4.903345,
        libele: "AMBERIEU EN DOMBES BP",
        caracteristique: "Bureau de Poste"
      },
    ]);
  });

  it(`/DELETE office/:libele`, async () => {
    // First prepare the data by adding a book
    await httpRequester.post('/offices').send({
      lat: 0,
      long: 0,
      libele: 'name_of_the_office',
      caracteristique: 'a type of office',
    });

    // Delete the book
    await httpRequester.delete('/offices/name_of_the_office').expect(200);

    // Finally check the book was successfully deleted
    const response = await httpRequester.get('/offices');

    expect(response.body).toMatchObject([
      {
        lat: 45.9598,
        long: 5.3582,
        libele: "AMBERIEU EN BUGEY",
        caracteristique: "Bureau de Poste"
      },
      {
        lat: 45.99639,
        long: 4.903345,
        libele: "AMBERIEU EN DOMBES BP",
        caracteristique: "Bureau de Poste"
      },
      {
        lat: 45.9116,
        long: 5.8083,
        libele: "ANGLEFORT RP",
        caracteristiques: "Relais poste commerçant"
      }
    ]);
  });
});
