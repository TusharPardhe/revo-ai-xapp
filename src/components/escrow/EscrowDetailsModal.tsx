import { EscrowData } from '@app-types/common';
import { getRelativeTime, getTokenName, renderValue } from '@utils/common.utils';
import { Dialog } from 'primereact/dialog';

import { useMemo } from 'react';

interface EscrowDetailsModalProps {
    escrowData: EscrowData;
    visible: boolean;
    onHide: () => void;
}

export default function EscrowDetailsModal({
    escrowData,
    visible,
    onHide,
}: EscrowDetailsModalProps) {
    const relativeTime = useMemo(() => {
        return getRelativeTime(escrowData.time);
    }, [escrowData.time]);

    return (
        <Dialog
            visible={visible}
            closeOnEscape
            onHide={onHide}
            dismissableMask
            blockScroll
            position="bottom"
            className="rounded-4 w-100 h-75 m-0"
            content={({ hide }) => (
                <div className="p-4 rounded-top-4 bg-white w-100 h-100">
                    <div className="d-flex justify-content-end">
                        <i
                            className="pi pi-times p-2 text-secondary rounded-circle bg-secondary-subtle"
                            style={{ fontSize: '1.2rem' }}
                            onClick={(e) => {
                                hide(e);
                                onHide();
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="fw-bold m-0 fs-1">Your Escrow Details.</div>
                    </div>
                    <div className="d-flex flex-column my-3">
                        <div className="fw-medium fs-6 text-muted">
                            Your SUIT coins, securely stashed away. Ready to be released when the
                            time is right.
                        </div>
                    </div>
                    <div
                        className="d-flex flex-column overflow-y-auto py-4 pb-5"
                        style={{ height: '400px' }}
                    >
                        <div className="d-flex flex-column gap-3 fw-medium fs-5 text-break">
                            <div className="d-flex flex-column justify-content-between">
                                <div className="fw-medium">Amount</div>
                                <div className="fw-normal text-secondary">
                                    {renderValue(escrowData.txs[0].Amount.value, { decimal: 0 })}{' '}
                                    {getTokenName(escrowData.txs[0].Amount.currency)}
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="fw-medium">
                                    Time {relativeTime.includes('ago') ? 'Past' : 'Left'}
                                </div>
                                <div
                                    className={`fw-normal ${escrowData.completed ? 'text-success text-opacity-75' : 'text-secondary'}`}
                                >
                                    {relativeTime}
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="fw-medium">Release Date</div>
                                <div className="fw-normal text-secondary">
                                    {renderValue(escrowData.time)}
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="fw-medium">Escrow ID</div>
                                <div className="fw-normal text-secondary">{`${renderValue(escrowData.id)}`}</div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="fw-medium">Wallet Address</div>
                                <div className="fw-normal text-secondary">{`${renderValue(escrowData.address)}`}</div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className="fw-medium">Created By</div>
                                <div className="fw-normal text-secondary">{`${renderValue(escrowData.createdBy)}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        />
    );
}
