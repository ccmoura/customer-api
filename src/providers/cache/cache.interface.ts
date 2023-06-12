export interface ICacheClient {
  get: (key: string) => Promise<any>;
  set: (key: string, value: string) => Promise<any>;
}

export interface ICacheProvider {
  load: (key: string) => Promise<any>;
  save: (key: string, value: string) => Promise<any>;
}
