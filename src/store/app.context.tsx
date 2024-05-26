// context.ts
import { useMergedState } from '@utils/hooks.utils';
import { XummSdkJwt } from 'xumm-sdk';

import { Dispatch, SetStateAction, createContext, useContext, useEffect } from 'react';
import { ReactNode } from 'react';

interface AppState {
    address: string;
    isApprover: boolean;
}
interface AppContextType {
    state: AppState;
    dispatch: Dispatch<SetStateAction<Partial<AppState>>>;
}

const INITIAL_STATE: AppState = { address: '', isApprover: false };

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

    const xummSdk = new XummSdkJwt(import.meta.env.VITE_XUMM_API_KEY);

    useEffect(() => {
        xummSdk.getOttData().then((ottData): void => {
            dispatch({ address: ottData.account ?? '' });
        });
    }, []);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
