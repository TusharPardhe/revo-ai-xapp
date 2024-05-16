export enum ESROW_USER_SELECTION {
    LATEST = 'latest',
    ACTIVE = 'active',
    COMPLETED = 'completed',
}

export interface EscrowData {
    _id: string;
    address: string;
    id: string;
    txs: Transaction[];
    completed: boolean;
    time: string;
    createdBy: string;
    approvedBy: string[];
    __v: number;
}

export interface Transaction {
    TransactionType: string;
    Account: string;
    Destination: string;
    Amount: {
        currency: string;
        value: string;
        issuer: string;
    };
    Fee: string;
}
