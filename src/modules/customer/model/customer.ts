import { randomUUID } from 'crypto';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { ICustomer } from '../customer.interface';

export class Customer {
  private _id: string;
  private _document: string;
  private _name: string;

  constructor({ document, name, id }: CreateCustomerDTO & { id?: string }) {
    this._id = id ?? randomUUID();
    this._document = document;
    this._name = name;
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get document(): string {
    return this._document;
  }

  public set document(document: string) {
    this._document = document;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public toJSON(): ICustomer {
    return {
      id: this.id,
      document: this._document,
      name: this.name,
    };
  }
}
