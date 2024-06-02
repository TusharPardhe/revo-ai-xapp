import FilledButton from '@components/button/FilledButton';
import { useAppContext } from '@store/app.context';
import { setObjectInAppStorage } from '@store/capacitor';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { isValidAddress } from 'xrpl';

import { useRef, useState } from 'react';

import { ROUTES } from '@/App.routes';
import AssetsUrl from '@/config/assets.url.config';

export default function Landing() {
    const [showInput, setShowInput] = useState(false);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const { dispatch } = useAppContext();

    const handleAddAccount = () => {
        setShowInput(true);
    };

    const handleAddressSubmit = async () => {
        if (!isValidAddress(address)) {
            toast.current?.show({
                severity: 'error',
                summary: 'Please enter a valid address',
                life: 3000,
            });
            return;
        }

        setObjectInAppStorage('walletAddress', address).then(() => {
            dispatch({ address });
            navigate(ROUTES.HOME);
        });
    };

    return (
        <div className="d-flex flex-column justify-content-between align-items-center vh-100 bg-white text-black">
            <img
                src={AssetsUrl.landingPageBackground}
                alt="Suit Vault Logo"
                className="position-absolute overflow-hidden"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    WebkitFilter: 'drop-shadow(0 0px 4px rgba(85, 83, 83, 0.56))',
                }}
            />
            <Toast ref={toast} position="top-center" />
            <div className="text-center mb-5 transition-fade">
                <h1
                    className="mt-1 mb-0 fw-bold text-black"
                    style={{
                        fontFamily: 'Cinzel Decorative, sans-serif',
                        fontSize: '2.8rem',
                        textShadow: '#0000004a 3px 2px 2px',
                        paddingTop: 'env(safe-area-inset-top)',
                    }}
                >
                    SUIT Vault
                </h1>
                <p className="fs-6 fw-lighter">A revo product</p>
            </div>
            {showInput ? (
                <div className="d-flex transition-fade justify-content-center w-100">
                    <div className="d-flex justify-content-center align-items-center mb-5 w-75">
                        <IconField className="w-100">
                            <InputText
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your wallet address"
                                className="rounded-4 w-100"
                                style={{
                                    border: '1px solid wheat',
                                }}
                            />
                            <InputIcon
                                className="pi pi-arrow-right"
                                style={{
                                    color: 'wheat',
                                    cursor: 'pointer',
                                }}
                                onClick={handleAddressSubmit}
                            />
                        </IconField>
                    </div>
                </div>
            ) : (
                <div className="d-flex mb-5 w-100 justify-content-center">
                    <FilledButton
                        label="Get Started"
                        buttonClassName="w-75"
                        onClick={handleAddAccount}
                    />
                </div>
            )}
        </div>
    );
}
