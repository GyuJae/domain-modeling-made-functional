/*
data Order = CustomerInfo
    AND ShippingAddress
    AND BillingAddress
    AND list of OrderLines
    AND AmountToBill

data ProductCode = WidgetCode OR GizmoCode

data OrderQuantity = UnitQuantity OR KilogramQuantity
 */

type Undefined = never;

type CustomerInfo = Undefined;
type ShippingAddress = Undefined;
type BillingAddress = Undefined;
type OrderLine = Undefined;
type BillAmount = Undefined;

declare const widgetCode: unique symbol;
class WidgetCode {
  [widgetCode]!: never;
  constructor(readonly value: string) {}
}
declare const gizmoCode: unique symbol;
class GizmoCode {
  [gizmoCode]!: never;
  constructor(readonly value: string) {}
}

declare const unitQuantity: unique symbol;
class UnitQuantity {
  [unitQuantity]!: never;

  constructor(readonly value: number) {}
}

declare const kilogramQuantity: unique symbol;
class KilogramQuantity {
  [kilogramQuantity]!: never;
  constructor(readonly value: number) {}
}

class Order {
  constructor(
    readonly customerInfo: CustomerInfo,
    readonly shippingAddress: ShippingAddress,
    readonly billingAddress: BillingAddress,
    readonly orderLines: Iterable<OrderLine>,
    readonly amountToBill: BillAmount,
  ) {}
}

type ProductCode = WidgetCode | GizmoCode;
type OrderQuantity = UnitQuantity | KilogramQuantity;

type ValidateOrder = (i: UnvalidatedOrder) => ValidatedOrder;

class PlaceOrderEvents {
  constructor(
    readonly acknowledgmentSent: AcknowledgementSend,
    readonly orderPlaced: OrderPlaced,
    readonly billableOrderPlaced: BillableOrderPlaced,
  ) {}
}

type PlaceOrder = (i: UnvalidatedOrder) => PlaceOrderEvents;
