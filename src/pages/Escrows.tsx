import { EscrowData } from '@app-types/common';
import EscrowDetailsCard from '@components/escrow/EscrowDetailsCard';
import { useAppContext } from '@store/app.context';
import { ApiCall } from '@utils/api.utils';
import { useDebounce } from '@utils/hooks.utils';
import { InputText } from 'primereact/inputtext';

import { useCallback, useEffect, useState } from 'react';

export default function Escrows() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hasFocus, setHasFocus] = useState(false);
    const [escrows, setEscrows] = useState<EscrowData[]>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const {
        state: { address },
    } = useAppContext();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFocus = () => {
        setHasFocus(true);
    };

    const handleBlur = () => {
        setHasFocus(false);
    };

    useEffect(() => {
        fetchEscrows();
    }, [debouncedSearchTerm, address]);

    const fetchEscrows = useCallback(async () => {
        const request = {
            url: '/user/escrows',
            method: 'GET',
            params: {
                sortBy: 'time',
                address,
            },
        };

        const response = await ApiCall(request);
        setEscrows(response?.data.escrows);
    }, [debouncedSearchTerm, address]);

    return (
        <div className="d-flex flex-column w-100">
            <div className="d-flex flex-column text-start p-4">
                <h2 className="fw-bold fs-1 mb-0 pt-3 px-1">Escrows</h2>
                <p className="fs-6 text-body-secondary mt-1 px-1">Your coins in the vault.</p>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <span className="p-input-icon-left w-100 px-4">
                    <i className="pi pi-search ps-3" />
                    <InputText
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by escrowId"
                        className="rounded-4 w-100 ps-5"
                        style={{
                            border: '1px solid #80808038',
                            outline: 'none',
                            boxShadow: hasFocus ? 'rgba(0, 0, 0, 0.1) 0px 1px 14px 0px' : 'none',
                            transition: 'box-shadow 0.3s',
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </span>
            </div>
            <div
                className="d-flex align-items-center flex-column gap-4 mt-1 py-1 px-4 overflow-auto mb-4"
                style={{
                    height: 'calc(100vh - 300px)',
                    scrollbarWidth: 'none',
                }}
            >
                {escrows.length > 0 ? (
                    escrows.map((escrowData, index) => (
                        <EscrowDetailsCard key={index} escrowData={escrowData} />
                    ))
                ) : (
                    <div className="d-flex bg-body-secondary p-3 text-left align-items-center w-100 h-75 rounded-4">
                        <h4 className="text-secondary fw-light m-0">
                            No escrows were found. If you think this is a mistake, reach us out on
                            our socials.
                        </h4>
                    </div>
                )}
            </div>
        </div>
    );
}
