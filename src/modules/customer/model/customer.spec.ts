import { Customer } from './customer';

describe('Customer', () => {
  it('should be defined', () => {
    expect(
      new Customer({ document: '123456', name: 'Customer Name' }),
    ).toBeDefined();
  });
});
