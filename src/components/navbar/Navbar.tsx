import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/App.routes';

const BottomNavbar = () => {
    const navigate = useNavigate();

    const onButtonClick = (link: string) => navigate(link);

    return (
        <div className="d-flex fixed-bottom py-3 gap-1 justify-content-center ">
            <Button
                icon="pi pi-home"
                text
                className="rounded-5"
                severity="secondary"
                size="large"
                onClick={() => onButtonClick(ROUTES.HOME)}
            />
            <Button
                icon="pi pi-lock"
                text
                className="rounded-5"
                severity="secondary"
                onClick={() => onButtonClick(ROUTES.ESCROWS)}
            />
        </div>
    );
};

export default BottomNavbar;
