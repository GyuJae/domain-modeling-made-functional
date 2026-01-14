declare const customerId: unique symbol;
export class CustomerId {
  [customerId]!: never;
  constructor(readonly value: number) {}
}
