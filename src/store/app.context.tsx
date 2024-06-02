import { useMergedState } from '@utils/hooks.utils';

import { Dispatch, SetStateAction, createContext, useContext, useEffect } from 'react';
import { ReactNode } from 'react';

import { getObjectFromAppStorage } from './capacitor';

interface AppState {
    address: string;
    isApprover: boolean;
    xrpBalance: number;
}
interface AppContextType {
    state: AppState;
    dispatch: Dispatch<SetStateAction<Partial<AppState>>>;
}

const INITIAL_STATE: AppState = { address: '', isApprover: false, xrpBalance: 0 };

const defaultContext: AppContextType = {
    state: INITIAL_STATE,
    dispatch: (_state: SetStateAction<Partial<AppState>>) => {},
};

const AppContext = createContext(defaultContext);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useMergedState<AppState>(INITIAL_STATE);

    useEffect(() => {
        getObjectFromAppStorage('walletAddress').then((address) => {
            dispatch({ address: address ?? '' });
        });
    }, []);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
