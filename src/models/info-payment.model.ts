export interface InfoPayment {
    _id?: string;
    amount: number;
    amountToPay: number;
    paymentDate?: Date;
    state?: string;
    createdAt?: Date;
    modifiedAt?: Date;
}