export class Order {
    constructor(public orderId: number,
        public orderedProduct: string,
        public orderDate: string,
        public orderAmount: number) { }
}
