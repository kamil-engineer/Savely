import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld, HTTPMethods } from '../support/custom-world';
import assert from 'assert';

Given('the API is running', function (this: CustomWorld) {
  if (!this.app) {
    throw new Error('App is not initialized. Did you forget BeforeAll hook?');
  }
});

When(
  'I send a {string} request to {string}',
  async function (this: CustomWorld, method: HTTPMethods, endpoint: string) {
    await this.sendRequest(method, endpoint);
  },
);

When(
  'I send a {string} request to {string} with body:',
  async function (this: CustomWorld, method: HTTPMethods, endpoint: string, docString: string) {
    let body: Record<string, any> | undefined;
    if (docString) {
      try {
        body = JSON.parse(docString) as Record<string, any>;
      } catch {
        throw new Error(`❌ Invalid JSON body:\n${docString}`);
      }
    }

    await this.sendRequest(method, endpoint, body);
  },
);

When('I set headers:', function (this: CustomWorld, dataTable: DataTable) {
  const headers: Record<string, string> = {};

  dataTable.rows().forEach(([key, value]: string[]) => {
    headers[key] = value;
  });
  this.setHeaders(headers);
});

Then('the response status code should be {int}', function (this: CustomWorld, statusCode: number) {
  this.assertStatus(statusCode);
});

Then('the response body should contain {string}', function (this: CustomWorld, key: string) {
  this.assertBodyContains(key);
});

Then(
  'the response body status should be {string}',
  function (this: CustomWorld, expectedStatus: string) {
    if (!this.response) throw new Error('Response not set');

    const body = this.response.body as Record<string, unknown>;
    const actualStatus = typeof body.status === 'string' ? body.status : undefined;

    if (actualStatus === undefined) {
      throw new Error(
        'Response body missing "status" field or it is not a string. Full response body:\n' +
          JSON.stringify(body, null, 2),
      );
    }

    assert.strictEqual(
      actualStatus,
      expectedStatus,
      `Expected response body status "${expectedStatus}", but got "${actualStatus}". Full response body:\n${JSON.stringify(
        body,
        null,
        2,
      )}`,
    );
  },
);
