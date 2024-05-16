import { useAppContext } from '@store/app.context';
import { ApiCall } from '@utils/api.utils';
import { renderValue } from '@utils/common.utils';

import { useEffect, useState } from 'react';

import AssetsUrl from '@/config/assets.url.config';

export default function DashboardSuitCoinBalanceCard() {
    const {
        state: { address },
    } = useAppContext();
    const [suitCoinBalance, setSuitCoinBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAccountDetails();
    }, [address]);

    const fetchAccountDetails = async () => {
        try {
            setLoading(true);
            const payload = {
                method: 'GET',
                url: 'user/account/details',
                params: { address },
            };
            const response = await ApiCall(payload);
            setSuitCoinBalance(response.data.suitCoinBalance);
        } catch (error) {
            console.error('fetchAccountDetails', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex text-light flex-column text-start p-3 rounded-4"
            style={{
                backgroundImage: `url(${AssetsUrl.suitCoinBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <h2 className="fw-bold fs-5">Suit Coin Balance</h2>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <p className="fs-6">{renderValue(suitCoinBalance)}</p>
            )}
        </div>
    );
}
