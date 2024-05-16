import { EscrowData } from '@app-types/common';
import { getRelativeTime, getTokenName, renderValue } from '@utils/common.utils';

import { CSSProperties, useMemo, useState } from 'react';

import AssetsUrl from '@/config/assets.url.config';

import EscrowDetailsModal from './EscrowDetailsModal';

export default function EscrowDetailsCard({
    escrowData,
    containerStyle,
}: {
    escrowData: EscrowData;
    containerStyle?: CSSProperties;
}) {
    const [showModal, setShowModal] = useState(false);

    const relativeTime = useMemo(() => {
        return getRelativeTime(escrowData.time);
    }, [escrowData.time]);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleHide = () => {
        setShowModal(false);
    };

    return (
        <>
            <div
                className="rounded-4 background-animation p-0 position-relative"
                style={{
                    backgroundImage: `url(${AssetsUrl.escrowBasicCardBackground})`,
                    backgroundSize: '150%',
                    backgroundPosition: 'center',
                    width: '90%',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 2px 2px 4px 0px',
                    height: '180px',
                    minHeight: '180px',
                    maxWidth: '252px',
                    minWidth: '252px',
                    border: '1px solid #00000061',
                    cursor: 'pointer',
                    ...containerStyle,
                }}
                onClick={handleClick}
            >
                <div
                    className="d-flex text-start h-100 rounded-4 px-3 py-4 top-0 w-100 h-100"
                    style={{
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        backgroundColor: 'rgb(255 255 255 / 18%)',
                    }}
                >
                    <div className="text-start rounded-4">
                        <h5 className="mb-1 fw-semibold">
                            {renderValue(escrowData.txs[0].Amount.value, { decimal: 0 })}{' '}
                            {getTokenName(escrowData.txs[0].Amount.currency)}
                        </h5>
                        <p
                            className={`m-0 fw-medium small ${escrowData.completed ? 'text-success text-opacity-75' : 'text-black'}`}
                        >
                            {relativeTime}
                        </p>
                        <div className="m-0 fw-medium text-muted small mt-1">
                            {`Coins will be released on ${renderValue(escrowData.time, { date: true })}`}
                        </div>
                    </div>
                    <div className="ms-auto align-self-end">
                        <i
                            className="pi pi-arrow-right me-2 p-2 text-white rounded-circle bg-dark"
                            style={{ fontSize: '1.2rem' }}
                        />
                    </div>
                </div>
            </div>
            <EscrowDetailsModal escrowData={escrowData} visible={showModal} onHide={handleHide} />
        </>
    );
}
