import { Customer } from './customer';

describe('Customer', () => {
  it('should be defined', () => {
    expect(
      new Customer({ document: '123456', name: 'Customer Name' }),
    ).toBeDefined();
  });

  it('should set properties to model', () => {
    const customer = new Customer({
      document: '123456',
      name: 'Customer Name',
    });

    customer.document = '654321';
    customer.name = 'Another Customer';
    customer.id = 'c9afb57d-64c5-4fa5-a0d9-585974511e94';

    const expectedJson = {
      document: '654321',
      name: 'Another Customer',
      id: 'c9afb57d-64c5-4fa5-a0d9-585974511e94',
    };

    expect(customer.document).toEqual('654321');
    expect(customer.name).toEqual('Another Customer');
    expect(customer.id).toEqual('c9afb57d-64c5-4fa5-a0d9-585974511e94');
    expect(customer.toJSON()).toStrictEqual(expectedJson);
  });
});
