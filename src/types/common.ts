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

export interface CreateEscrowState {
    address: string;
    amount: string;
    isNewAccount: boolean;
    seed: string;
    date: Date | null;
    secret: string;
}

export interface CreateEscrowStateErrors {
    address: string;
    amount: string;
    seed: string;
    date: string;
    secret: string;
}

export interface TrustLine {
    account: string;
    balance: string;
    currency: string;
    limit: string;
    limit_peer: string;
    quality_in: number;
    quality_out: number;
}
export interface AccountDetailsResponse {
    data: {
        isApprover: boolean;
        escrowCount: {
            total: number;
            completed: number;
            outstanding: number;
        };
        hasSuitCoinTrustline: boolean;
        suitCoinBalance: number;
        issuedCurrencies: string[];
        xrpBalance: number;
        newAccount: boolean;
        trustLines: TrustLine[];
    }
}

export interface NavLink {
    icon: string;
    text: string;
    link: string;
    enable: boolean;
}