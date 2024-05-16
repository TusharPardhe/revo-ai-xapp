import BottomNavbar from '@components/navbar/Navbar';
import { AppProvider } from '@store/app.context';
import { PrimeReactProvider } from 'primereact/api';

import { AppRoutes } from '@/App.routes';
import PrimeReactProviderConfig from '@/config/primereact.provider.config';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

function App() {
    return (
        <PrimeReactProvider value={PrimeReactProviderConfig}>
            <AppProvider>
                <AppRoutes />
                <BottomNavbar />
            </AppProvider>
        </PrimeReactProvider>
    );
}

export default App;
