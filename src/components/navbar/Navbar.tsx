import { NavLink } from '@app-types/common';
import { Keyboard } from '@capacitor/keyboard';
import { useAppContext } from '@store/app.context';
import { NavBarLinks } from '@utils/common.utils';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { ROUTES } from '@/App.routes';

const BottomNavbar = () => {
    const navigate = useNavigate();
    const { isApprover } = useAppContext().state;
    const [navLinks, setNavLinks]: [NavLink[], React.Dispatch<React.SetStateAction<NavLink[]>>] =
        useState(NavBarLinks);
    const [hideNavbar, setHideNavbar] = useState(false);

    const isLandingPage = window.location.pathname === ROUTES.LANDING;

    const onButtonClick = (link: string) => navigate(link);

    useEffect(() => {
        const updatedNavLinks = navLinks.map((navLink) => {
            if (navLink.link === ROUTES.CREATE_ESCROW) {
                return { ...navLink, enable: isApprover };
            }
            return navLink;
        });
        setNavLinks(updatedNavLinks);

        Keyboard.addListener('keyboardWillShow', () => {
            setHideNavbar(true);
        });

        Keyboard.addListener('keyboardWillHide', () => {
            setHideNavbar(false);
        });
    }, [isApprover]);

    if (isLandingPage) {
        return null;
    }

    return (
        <div
            className={` ${hideNavbar ? 'd-none' : 'd-flex'} fixed-bottom py-3 gap-1 justify-content-center z-2`}
        >
            {navLinks
                .filter(({ enable }) => enable)
                .map((link) => (
                    <Button
                        key={link.text}
                        icon={link.icon}
                        text
                        className="rounded-5"
                        severity="secondary"
                        size="large"
                        onClick={() => onButtonClick(link.link)}
                    />
                ))}
        </div>
    );
};

export default BottomNavbar;
