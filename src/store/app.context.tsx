// context.ts
import { useMergedState } from '@utils/hooks.utils';

import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { ReactNode } from 'react';

interface AppState {
    address: string;
}

interface AppContextType {
    state: AppState;
    dispatch: Dispatch<SetStateAction<AppState>>;
}

const defaultContext: AppContextType = {
    state: { address: '' },
    dispatch: (_state: SetStateAction<AppState>) => {},
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
    const [state, dispatch] = useMergedState<AppState>({ address: '' });

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
