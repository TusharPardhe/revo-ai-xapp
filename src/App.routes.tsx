import CreateEscrow from '@pages/CreateEscrow';
import Escrows from '@pages/Escrows';
import Home from '@pages/Home';
import { Route, Routes, useLocation } from 'react-router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const ROUTES = {
    HOME: '/',
    ESCROWS: '/escrows',
    CREATE_ESCROW: '/create-escrow',
};

export function AppRoutes() {
    const location = useLocation();
    return (
        <SwitchTransition>
            <CSSTransition key={location.pathname} timeout={300} classNames="page" unmountOnExit>
                <Routes location={location}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.ESCROWS} element={<Escrows />} />
                    <Route path={ROUTES.CREATE_ESCROW} element={<CreateEscrow />} />
                </Routes>
            </CSSTransition>
        </SwitchTransition>
    );
}
