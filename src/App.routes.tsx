import Escrows from '@pages/Escrows';
import Home from '@pages/Home';
import { Route, Routes, useLocation } from 'react-router';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const ROUTES = {
    HOME: '/',
    ESCROWS: '/escrows',
};

export function AppRoutes() {
    const location = useLocation();
    return (
        <SwitchTransition>
            <CSSTransition key={location.pathname} timeout={300} classNames="page" unmountOnExit>
                <Routes location={location}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.ESCROWS} element={<Escrows />} />
                </Routes>
            </CSSTransition>
        </SwitchTransition>
    );
}
