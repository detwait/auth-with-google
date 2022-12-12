
import { NestApplication } from '@nestjs/core';
import * as request from 'supertest';
import { Connection } from 'typeorm';

import { RequestParamsModel } from '../../src/user/model/request-params.model';
import { createTestApp } from './helpers/create-test-app';

export class TestApplication {
  private app: NestApplication;
  private serverUrl: string = 'https://localhost:3000';
  private testMode: 'local' | 'http' = 'local';
  private ready: boolean = false;

  constructor(testMode: 'local' | 'http' = 'local', serverUrl?: string) {
    this.testMode = testMode;
    if (serverUrl) {
      this.serverUrl = serverUrl;
    }
  }

  getNestApp(): NestApplication {
    return this.app;
  }

  async close(): Promise<void> {
    await this.disconnectIfRequired();
    await this.getNestApp().close();
  }

  async init(): Promise<void> {
    if (this.ready) {
      return;
    }
    if (this.testMode === 'local') {
      this.app = await createTestApp();
    }
    this.ready = true;
  }

  private getServer(): any {
    return this.testMode === 'local' ? this.app.getHttpServer() : this.serverUrl;
  }

  // eslint-disable-next-line complexity
  async request<R>(req: RequestParamsModel): Promise<R> {
    let requestTest: request.Test = request(this.getServer())[req.method.toLowerCase()](req.url);
    requestTest.disableTLSCerts();
    if (!req.headers) {
      req.headers = {};
    }

    if (req.headers) {
      for (const [key, value] of Object.entries(req.headers)) {
        requestTest = requestTest.set(key, value);
      }
    }

    if (req.token) {
      requestTest = requestTest.set('Authorization', `Bearer ${req.token}`);
    }

    if (req.payload) {
      const payload: any = req.payload;
      if (Object.keys(payload).length > 0) {
        requestTest = requestTest.send(payload);
      }
    }

    if (req.query) {
      requestTest = requestTest.query(req.query);
    }

    // // eslint-disable-next-line no-console
    // requestTest = requestTest.on('error', (error: any) => console.error(error));

    const response: any = await requestTest
      .expect((res: request.Response) => {
        if (res.status !== req.status) {
          // eslint-disable-next-line no-console
          console.error(res.body);
        }
      })
      .expect(req.status);

    return response.body as R;
  }

  async disconnectIfRequired(): Promise<void> {
    await this.app.get(Connection).close();
    await this.app.close();
  }
}
