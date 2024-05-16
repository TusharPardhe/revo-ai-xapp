import { ESROW_USER_SELECTION } from '@app-types/common';

import { Dispatch, SetStateAction } from 'react';

import EscrowFilterButton from './EscrowFilterButton';

interface ButtonConfig {
    label: string;
    value: ESROW_USER_SELECTION;
}

export const escrowButtons: ButtonConfig[] = [
    {
        label: 'Latest',
        value: ESROW_USER_SELECTION.LATEST,
    },
    {
        label: 'Active',
        value: ESROW_USER_SELECTION.ACTIVE,
    },
    {
        label: 'Completed',
        value: ESROW_USER_SELECTION.COMPLETED,
    },
];

export function DashboardEscrowFilter({
    userSelection,
    setUserSelection,
}: {
    userSelection: string;
    setUserSelection: Dispatch<SetStateAction<ESROW_USER_SELECTION>>;
}) {
    return (
        <div className="d-flex flex-column text-start">
            <div
                className="d-flex flex-nowrap overflow-auto"
                style={{
                    scrollbarWidth: 'none',
                }}
            >
                <div className="d-flex flex-nowrap gap-3 py-3">
                    {escrowButtons.map(({ label, value }) => (
                        <EscrowFilterButton
                            key={label}
                            label={label}
                            isSelected={userSelection === value}
                            onClick={() => setUserSelection(value)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
