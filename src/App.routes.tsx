import FullScreenLoader from '@components/loader/FullScreenLoader';
import AccountSettings from '@pages/AccountSettings';
import CreateEscrow from '@pages/CreateEscrow';
import Escrows from '@pages/Escrows';
import Home from '@pages/Home';
import Landing from '@pages/Landing';
import { getObjectFromAppStorage } from '@store/capacitor';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { useEffect, useState } from 'react';

export const ROUTES = {
    LANDING: '/',
    HOME: '/home',
    ESCROWS: '/escrows',
    CREATE_ESCROW: '/create-escrow',
    ACCOUNT_SETTINGS: '/account-settings',
};

const CheckStoredAddress = ({ children }: { children: React.ReactNode }) => {
    const [storedAddress, setStoredAddress] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkWalletAddress = async () => {
            const address = await getObjectFromAppStorage('walletAddress');
            setStoredAddress(address as string);
            setIsLoading(false);
        };

        checkWalletAddress();
    }, []);

    if (isLoading) {
        return <FullScreenLoader loading={true} message="Loading..." />;
    }

    return storedAddress ? <Navigate to={ROUTES.HOME} replace /> : children;
};

export function AppRoutes() {
    const location = useLocation();

    return (
        <SwitchTransition>
            <CSSTransition key={location.pathname} timeout={300} classNames="page" unmountOnExit>
                <Routes location={location}>
                    <Route
                        path={ROUTES.LANDING}
                        element={
                            <CheckStoredAddress>
                                <Landing />
                            </CheckStoredAddress>
                        }
                    />
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.ESCROWS} element={<Escrows />} />
                    <Route path={ROUTES.CREATE_ESCROW} element={<CreateEscrow />} />
                    <Route path={ROUTES.ACCOUNT_SETTINGS} element={<AccountSettings />} />
                </Routes>
            </CSSTransition>
        </SwitchTransition>
    );
}
