import { CreateEscrowState, CreateEscrowStateErrors } from '@app-types/common';
import { copyToClipboard } from '@utils/common.utils';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

import { useRef } from 'react';

interface CreateEscrowFormProps {
    errors: CreateEscrowStateErrors;
    address: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    amount: string;
    seed: string;
    date: Date | null;
    secret: string;
    setState: (newState: Partial<CreateEscrowState>) => void;
}

export function CreateEscrowForm({
    errors,
    address,
    handleChange,
    amount,
    seed,
    date,
    secret,
    setState,
}: CreateEscrowFormProps) {
    const toast = useRef<Toast>(null);

    const showSuccess = () => {
        toast.current?.show({
            severity: 'success',
            summary: 'Seed copied to clipboard',
            life: 3000,
        });
    };

    const onSeedClick = () => {
        copyToClipboard(seed, showSuccess);
    };

    return (
        <div className="d-flex flex-column justify-content-center mb-4 p-4 gap-3">
            <Toast ref={toast} position="top-center" />
            <div className="flex flex-wrap align-items-center">
                <label htmlFor="address" className="p-sr-only">
                    Address (r...)
                </label>
                <InputText
                    id="address"
                    name="address"
                    placeholder="Escrow Address"
                    className={`${errors.address ? 'p-invalid' : ''} w-100 mr-2`}
                    value={address}
                    onChange={handleChange}
                />
                {errors.address.length > 0 && <Message severity="error" text={errors.address} />}
            </div>
            <div className="flex flex-wrap align-items-center">
                <label htmlFor="amount" className="p-sr-only">
                    Amount
                </label>
                <InputText
                    id="amount"
                    name="amount"
                    placeholder="Amount"
                    className={`${errors.amount ? 'p-invalid' : ''} w-100 mr-2`}
                    value={amount}
                    onChange={handleChange}
                />
                {errors.amount.length > 0 && <Message severity="error" text={errors.amount} />}
            </div>
            {seed?.length > 0 && (
                <div className="flex flex-wrap align-items-center">
                    <label htmlFor="seed" className="p-sr-only">
                        New Account Seed
                    </label>
                    <InputText
                        id="seed"
                        name="seed"
                        placeholder="New Account Seed"
                        className={`${errors.seed ? 'p-invalid' : ''} w-100 mr-2`}
                        value={seed}
                        onFocus={onSeedClick}
                    />
                    {errors.seed.length > 0 && <Message severity="error" text={errors.seed} />}
                </div>
            )}
            <div className="flex flex-wrap align-items-center">
                <label htmlFor="releaseDate" className="p-sr-only">
                    Escow Release Date
                </label>
                <Calendar
                    inputId="releaseDate"
                    aria-label="releaseDate"
                    className="w-100 mr-2"
                    value={date}
                    onChange={(e) => setState({ date: e.value })}
                    touchUI
                    invalid={errors.date.length > 0}
                    placeholder="Escrow Release Date"
                />
                {errors.date.length > 0 && <Message severity="error" text={errors.date} />}
            </div>
            <div className="flex flex-wrap align-items-center">
                <label htmlFor="secret" className="p-sr-only">
                    Secret
                </label>
                <InputText
                    id="secret"
                    name="secret"
                    placeholder="Secret"
                    className={`${errors.secret ? 'p-invalid' : ''} w-100 mr-2`}
                    value={secret}
                    onChange={handleChange}
                />
                {errors.secret.length > 0 && <Message severity="error" text={errors.secret} />}
            </div>
        </div>
    );
}
