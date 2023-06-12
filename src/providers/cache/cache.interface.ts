export interface ICacheClient {
  get: (key: string) => Promise<string>;
  set: (key: string, value: string) => Promise<boolean>;
  update: (oldKey: string, newKey: string, value: string) => Promise<boolean>;
  isAvailable: () => boolean;
}

export interface ICacheProvider {
  load: (key: string) => Promise<unknown>;
  save: (key: string, value: unknown) => Promise<any>;
  update: (key: string, value: unknown) => Promise<boolean>;
}
