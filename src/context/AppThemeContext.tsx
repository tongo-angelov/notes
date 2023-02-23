import { createContext, useMemo } from "react";

import { createTheme, ThemeProvider } from "@mui/material";

import useStorage from "../useStorage";

type ContextType = {
    toggleTheme: () => void;
};

export const AppThemeContext = createContext<ContextType>({
    toggleTheme: () => { }
});

type AppThemeContextProviderProps = {
    children: JSX.Element | JSX.Element[];
};

export const AppThemeContextProvider = ({ children }: AppThemeContextProviderProps) => {
    const [themeMode, setThemeMode] = useStorage<'light' | 'dark'>('theme', 'dark');

    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const context = {
        toggleTheme
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                },
            }),
        [themeMode],
    );

    return (
        <AppThemeContext.Provider value={context}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
};