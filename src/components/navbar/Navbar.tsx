import { NavLink } from '@app-types/common';
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

    const onButtonClick = (link: string) => navigate(link);

    useEffect(() => {
        const updatedNavLinks = navLinks.map((navLink) => {
            if (navLink.link === ROUTES.CREATE_ESCROW) {
                return { ...navLink, enable: isApprover };
            }
            return navLink;
        });
        setNavLinks(updatedNavLinks);
    }, [isApprover]);

    return (
        <div className="d-flex fixed-bottom py-3 gap-1 justify-content-center ">
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
