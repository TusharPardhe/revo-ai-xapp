import { ESROW_USER_SELECTION, EscrowData } from '@app-types/common';
import { useAppContext } from '@store/app.context';
import { ApiCall } from '@utils/api.utils';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { DashboardEscrowFilter } from './DashboardEscrowFilter';
import EscrowDetailsCard from './EscrowDetailsCard';

interface DashboardEscrowCardCarouselProps {
    userSelection: ESROW_USER_SELECTION;
    setUserSelection: Dispatch<SetStateAction<ESROW_USER_SELECTION>>;
}

export default function DashboardEscrowCardCarousel({
    userSelection,
    setUserSelection,
}: DashboardEscrowCardCarouselProps) {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const [escrows, setEscrows] = useState<EscrowData[]>([]);
    const {
        state: { address },
    } = useAppContext();

    const onViewAllClick = () => {
        navigate('/escrows');
    };

    useEffect(() => {
        fetchEscrows();
    }, [userSelection, address]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = 0;
        }
    }, [escrows]);

    const fetchEscrows = useCallback(async () => {
        let completed = null;

        if (userSelection === ESROW_USER_SELECTION.COMPLETED) {
            completed = true;
        } else if (userSelection === ESROW_USER_SELECTION.ACTIVE) {
            completed = false;
        }

        const request = {
            url: '/user/escrows',
            method: 'GET',
            params: {
                completed,
                sortBy: 'time',
                address,
            },
        };
        const response = await ApiCall(request);
        setEscrows(response?.data.escrows ?? []);
    }, [userSelection, address]);

    return (
        <>
            <div className="d-flex flex-column text-start mt-5">
                <div className="d-flex flex-column text-start mt-2 px-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="fw-bold fs-4 m-0">Escrows</h2>
                        <Button
                            link
                            size="small"
                            className="shadow-none p-0 fw-light text-body-secondary"
                            onClick={onViewAllClick}
                        >
                            View all
                        </Button>
                    </div>
                    <p className="fs-6 text-body-secondary mt-1">Manage your escrows</p>
                </div>
            </div>
            <DashboardEscrowFilter
                userSelection={userSelection}
                setUserSelection={setUserSelection}
            />
            <div className="d-flex flex-column text-start mt-3">
                <div
                    className="d-flex flex-row gap-4 overflow-auto"
                    style={{
                        height: '220px',
                        scrollbarWidth: 'none',
                    }}
                    ref={containerRef}
                >
                    {escrows.length > 0 ? (
                        escrows.map((escrowData, index) => (
                            <EscrowDetailsCard key={index} escrowData={escrowData} />
                        ))
                    ) : (
                        <div className="d-flex bg-body-secondary p-3 text-left align-items-center w-100 h-75 rounded-4">
                            <h4 className="text-secondary fw-light m-0">
                                No escrows were found. If you think this is a mistake, reach us out
                                on our socials.
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
