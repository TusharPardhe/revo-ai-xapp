import FilledButton from '@components/button/FilledButton';
import { useAppContext } from '@store/app.context';
import { setObjectInAppStorage } from '@store/capacitor';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { isValidAddress } from 'xrpl';

import { useRef, useState } from 'react';

import { ROUTES } from '@/App.routes';

const AccountSettings = () => {
    const [visible, setVisible] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useAppContext();
    const toast = useRef<Toast>(null);

    const handleChangeAddress = () => {
        setVisible(true);
    };

    const handleAddressSubmit = async () => {
        if (!isValidAddress(newAddress)) {
            toast.current?.show({
                severity: 'error',
                summary: 'Please enter a valid address',
                life: 3000,
            });
            return;
        }

        setLoading(true);
        await setObjectInAppStorage('walletAddress', newAddress);
        dispatch({ address: newAddress });
        setLoading(false);
        setVisible(false);
        navigate(ROUTES.HOME);
    };

    const renderFooter = () => {
        return (
            <div>
                <FilledButton
                    label="Update Address"
                    onClick={handleAddressSubmit}
                    icon="pi pi-check"
                    disabled={loading}
                />
            </div>
        );
    };

    return (
        <div className="d-flex flex-column w-100 p-3">
            <div className="d-flex flex-column text-start px-4 py-1">
                <h2
                    className="fw-bold fs-1 mb-0 text-truncate"
                    style={{
                        paddingTop: 'env(safe-area-inset-top)',
                    }}
                >
                    Settings
                </h2>
                <p className="fs-6 text-body-secondary mt-1">Manage your account</p>
            </div>
            <FilledButton label="Change Account" onClick={handleChangeAddress} />
            <Toast ref={toast} />
            <Dialog
                header="Change Account"
                visible={visible}
                onHide={() => setVisible(false)}
                footer={renderFooter()}
                blockScroll
            >
                <div className="mb-3">
                    <label htmlFor="newAddress" className="form-label">
                        New Wallet Address
                    </label>
                    <InputText
                        id="newAddress"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        className="w-100"
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default AccountSettings;
