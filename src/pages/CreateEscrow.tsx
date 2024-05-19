import { CreateEscrowState, CreateEscrowStateErrors } from '@app-types/common';
import { useAppContext } from '@store/app.context';
import { ApiCall } from '@utils/api.utils';
import { useMergedState } from '@utils/hooks.utils';
import {
    SUIT_COIN_ESCROW_ACCOUNT,
    SUIT_COIN_HEX,
    SUIT_COIN_ISSUER,
    SUIT_COIN_LIMIT,
} from '@utils/xrpl.utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Client, Payment, TrustSet, Wallet, isValidAddress, xrpToDrops } from 'xrpl';
import { PaymentMetadata } from 'xrpl/dist/npm/models/transactions/payment';

import { useCallback, useRef, useState } from 'react';

import { CreateEscrowForm } from '@/components/escrow/CreateEscrowForm';

const INITIAL_STATE: CreateEscrowState = {
    address: '',
    amount: '',
    isNewAccount: false,
    seed: '',
    date: null,
    secret: '',
};

const INITAL_ERRORS_STATE: CreateEscrowStateErrors = {
    address: '',
    amount: '',
    seed: '',
    date: '',
    secret: '',
};

export default function CreateEscrow() {
    const [state, setState] = useMergedState<CreateEscrowState>(INITIAL_STATE);

    const {
        state: { address: escrowerAddress },
    } = useAppContext();

    const [userSelection, setUserSelection] = useState<null | boolean>(null);

    const [errors, setErrors] = useState<CreateEscrowStateErrors>(INITAL_ERRORS_STATE);

    const { address, amount, isNewAccount, seed, date, secret } = state;

    const toast = useRef<Toast>(null);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (name === 'address' && isNewAccount) return; // Prevent changing address if new account
            setState({ [name]: value });
            setErrors((prev) => ({ ...prev, [name]: '' }));
        },
        [setState]
    );

    const generateNewWallet = useCallback(() => {
        const wallet = Wallet.generate();
        setState({ seed: wallet.seed, address: wallet.address });
    }, [setState]);

    const validateFields = () => {
        let isValid = true;
        const currentErrors = {
            address: '',
            amount: '',
            seed: '',
            date: '',
            secret: '',
        };

        if (address.length === 0 || !isValidAddress(address)) {
            currentErrors.address = 'Please enter destination address';
            isValid = false;
        }

        if (amount.length === 0 || isNaN(Number(amount)) || Number(amount) <= 0) {
            currentErrors.amount = 'Please enter amount';
            isValid = false;
        }

        if (date === null) {
            currentErrors.date = 'Please select date';
            isValid = false;
        }

        if (isNewAccount && seed.length === 0) {
            currentErrors.seed = 'Please try again, the seed is empty';
            isValid = false;
        }

        if (secret.length === 0) {
            currentErrors.secret = 'Please enter a secret';
            isValid = false;
        }

        try {
            const wallet = Wallet.fromSeed(secret);
            if (wallet.address !== escrowerAddress) {
                currentErrors.secret = 'The secret does not match with the address of the escrower';
                isValid = false;
            }
        } catch (error) {
            console.error(error);
            currentErrors.secret = 'Please enter a valid secret';
            isValid = false;
        }

        setErrors(currentErrors);
        return isValid;
    };

    const addSuitTrustlineToNewAccount = async (client: Client) => {
        const trustLine: TrustSet = {
            TransactionType: 'TrustSet',
            Account: state.address,
            LimitAmount: {
                currency: SUIT_COIN_HEX,
                value: SUIT_COIN_LIMIT,
                issuer: SUIT_COIN_ISSUER,
            },
            Flags: 131072,
            Fee: '12',
        };

        const newWallet = Wallet.fromSeed(state.seed);
        await client
            .submitAndWait(trustLine, {
                wallet: newWallet,
                autofill: true,
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

    const handleUserSelection = (selection: boolean) => {
        if (selection) {
            generateNewWallet();
            setState({ isNewAccount: true });
        }
        setUserSelection(selection);
    };

    const handleReset = () => {
        setState(INITIAL_STATE);
        setUserSelection(null);
        setErrors(INITAL_ERRORS_STATE);
    };

    const handleCreateEscrow = async () => {
        const client = new Client(import.meta.env.VITE_XRPL_SERVER);
        const isValid = validateFields();
        if (!isValid) return;

        const wallet = Wallet.fromSeed(secret);

        try {
            // Fund and add trustline to the new account
            if (isNewAccount) {
                const transferXRP: Payment = {
                    TransactionType: 'Payment',
                    Account: escrowerAddress,
                    Destination: state.address,
                    Amount: xrpToDrops(14),
                    Fee: '24',
                };
                const funded = await client.submitAndWait(transferXRP, {
                    wallet,
                    autofill: true,
                });

                if ((funded.result.meta as PaymentMetadata)?.TransactionResult !== 'tesSUCCESS') {
                    throw new Error('Insufficient balance');
                }

                await addSuitTrustlineToNewAccount(client);
            }

            // Save escrow data to the database
            const transactions: Payment[] = [
                {
                    TransactionType: 'Payment',
                    Account: SUIT_COIN_ESCROW_ACCOUNT,
                    Destination: state.address,
                    Amount: {
                        currency: SUIT_COIN_HEX,
                        value: amount.toString(),
                        issuer: SUIT_COIN_ISSUER,
                    },
                    Fee: '24',
                },
            ];

            // Send the SUIT coins to the escrow account
            const sendSuitToEscrow: Payment = {
                TransactionType: 'Payment',
                Account: escrowerAddress,
                Destination: SUIT_COIN_ESCROW_ACCOUNT,
                Amount: {
                    currency: SUIT_COIN_HEX,
                    value: amount.toString(),
                    issuer: SUIT_COIN_ISSUER,
                },
                Fee: '24',
            };

            const escrowWalletTx = await client.submit(sendSuitToEscrow, {
                wallet,
                autofill: true,
            });

            if (escrowWalletTx.result.engine_result === 'tesSUCCESS') {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Escrow added successfully',
                    life: 3000,
                });

                await ApiCall({
                    method: 'POST',
                    url: 'user/save/account/escrow',
                    data: {
                        account: address,
                        txs: transactions,
                        createdBy: escrowerAddress,
                        approvedBy: escrowerAddress,
                        time: date,
                    },
                });
            } else {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Something went wrong, please try again later.',
                    life: 3000,
                });
            }

            handleReset();
        } catch (error) {
            console.error(error);
            toast.current?.show({
                severity: 'error',
                summary:
                    (error as Error).message || 'Something went wrong, please try again later.',
                life: 3000,
            });
        }
    };

    return (
        <div
            className="d-flex flex-column w-100"
            style={{
                height: 'calc(100vh - 100px)',
            }}
        >
            <Toast ref={toast} position="top-center" />
            <div className="d-flex flex-column text-start p-4">
                <h2 className="fw-bold fs-1 mb-0 pt-3 px-1">Create Escrows</h2>
                <p className="fs-6 text-body-secondary mt-1 px-1">
                    Securely stash away coins for the investors.
                </p>
            </div>
            {userSelection === null ? (
                <div className="d-flex flex-column align-items-center px-4">
                    <Button
                        label="New Account?"
                        severity="secondary"
                        className="rounded-4 w-100 mb-2"
                        outlined
                        onClick={() => handleUserSelection(true)}
                    />
                    <Button
                        label="Existing Account?"
                        severity="secondary"
                        outlined
                        className="rounded-4 w-100"
                        onClick={() => handleUserSelection(false)}
                    />
                </div>
            ) : (
                <div className="d-flex flex-column h-100">
                    <CreateEscrowForm
                        {...{ errors, address, handleChange, seed, amount, date, secret, setState }}
                    />
                    <div className="d-flex justify-content-center flex-column gap-2 px-4 mt-auto ">
                        <Button
                            label="Create Escrow"
                            severity="info"
                            outlined
                            className="rounded-4"
                            onClick={handleCreateEscrow}
                        />
                        <Button label="Reset" severity="danger" text onClick={handleReset} />
                    </div>
                </div>
            )}
        </div>
    );
}
