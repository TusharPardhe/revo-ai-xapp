import { ESROW_USER_SELECTION } from '@app-types/common';
import DashboardEscrowCardCarousel from '@components/escrow/DashboardEscrowCardCarousel';
import DashboardSuitCoinBalanceCard from '@components/user/DashboardSuitCoinBalanceCard';
import { useAppContext } from '@store/app.context';

import { useState } from 'react';

export default function Home() {
    const [userSelection, setUserSelection] = useState<ESROW_USER_SELECTION>(
        ESROW_USER_SELECTION.LATEST
    );
    const {
        state: { address },
    } = useAppContext();

    return (
        <div className="d-flex flex-column w-100 p-3">
            <div className="d-flex flex-column text-start py-3 px-1">
                <h2 className="fw-bold fs-1 mb-0 text-truncate">
                    Hello {address.slice(0, 10)}
                    {address.length > 0 ? '...' : 'User'},
                </h2>
                <p className="fs-6 text-body-secondary mt-1">Experience our vision</p>
            </div>
            <DashboardSuitCoinBalanceCard />
            <DashboardEscrowCardCarousel {...{ userSelection, setUserSelection }} />
        </div>
    );
}
