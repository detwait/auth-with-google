
export interface RequestParamsModel {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  status: number;
  token?: string;
  payload?: any;
  headers?: Record<string, any>;
  query?: Record<string, any>;
}
