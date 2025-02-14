'use client'

import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import ColorSchemeContext from './ColorSchemeContext';
import { useEffect, useState } from 'react';

export default function Providers({ children }) {
    let preference = 'light'
    const [colorScheme, setColorScheme] = useState(preference);

    useEffect(() => {
        setColorScheme(localStorage.getItem('preference') || 'light')
    }, [])    

    return(
        <SessionProvider>
            <ColorSchemeContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
                <MantineProvider theme={{ colorScheme }}>
                    {children}
                </MantineProvider>
            </ColorSchemeContext.Provider>
        </SessionProvider>
    )
}