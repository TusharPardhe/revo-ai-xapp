import { ESROW_USER_SELECTION } from '@app-types/common';
import DashboardEscrowCardCarousel from '@components/escrow/DashboardEscrowCardCarousel';
import DashboardSuitCoinBalanceCard from '@components/user/DashboardSuitCoinBalanceCard';
import { useAppContext } from '@store/app.context';
import { renderValue } from '@utils/common.utils';
import { Chip } from 'primereact/chip';

import { useState } from 'react';

export default function Home() {
    const [userSelection, setUserSelection] = useState<ESROW_USER_SELECTION>(
        ESROW_USER_SELECTION.LATEST
    );
    const {
        state: { address, xrpBalance },
    } = useAppContext();

    return (
        <div className="d-flex flex-column w-100 px-3 pb-3">
            <div className="d-flex flex-column text-start py-3 px-1">
                <h2
                    className="fw-bold fs-1 mb-0 text-truncate"
                    style={{
                        paddingTop: 'env(safe-area-inset-top)',
                    }}
                >
                    Hello {address.slice(0, 10)}
                    {address.length > 0 ? '...' : 'User'},
                </h2>
                <p className="fs-6 text-body-secondary mt-1">Experience our vision</p>
                <p className="fs-6 text-body-secondary m-0">
                    <Chip label={`${renderValue(xrpBalance)} XRP`} />
                </p>
            </div>
            <DashboardSuitCoinBalanceCard />
            <DashboardEscrowCardCarousel {...{ userSelection, setUserSelection }} />
        </div>
    );
}
