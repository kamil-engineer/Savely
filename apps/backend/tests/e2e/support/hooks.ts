import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { CustomWorld } from './custom-world';

let app: INestApplication;

BeforeAll(async function () {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();
});

AfterAll(async function () {
  if (app) {
    try {
      await app.close();
    } catch (err) {
      console.error('Error closing Nest application in AfterAll hook:', err);
    }
  }
});

Before(function (this: CustomWorld) {
  if (!app) {
    throw new Error('Nest application has not been initialized in BeforeAll hook.');
  }
  this.app = app;
});

After(function (this: CustomWorld) {
  this.response = undefined;
});
