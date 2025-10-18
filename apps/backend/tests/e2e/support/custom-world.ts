/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';

export type HTTPMethods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export class CustomWorld extends World {
  app?: INestApplication;
  response?: Response;
  headers: Record<string, string> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }

  setHeaders(headers: Record<string, string>) {
    this.headers = { ...this.headers, ...headers };
  }

  async sendRequest(
    method: HTTPMethods,
    endpoint: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
  ) {
    if (!this.app) throw new Error('App is not running');

    const server = this.app.getHttpServer();

    let req = (request(server) as any)[method.toLowerCase()](endpoint);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        req = req.set(key, value);
      }
    }

    if (body) {
      req = req.send(body);
    }

    this.response = await req;
  }

  assertStatus(expected: number) {
    if (!this.response) throw new Error('Response not set');
    if (this.response.status !== expected) {
      throw new Error(`Expected status ${expected}, got ${this.response.status}`);
    }
  }

  assertBodyContains(key: string) {
    if (!this.response) throw new Error('Response not set');
    if (!(key in this.response.body)) {
      throw new Error(`Response body missing key: ${key}`);
    }
  }
}

setWorldConstructor(CustomWorld);
