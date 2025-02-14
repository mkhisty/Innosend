'use client'

import ColorSchemeContext from '@/app/ColorSchemeContext'
import { useContext } from 'react'
import globals from "@/css/globals.module.css"

export default function Background() {
    const colorSchemeContext = useContext(ColorSchemeContext)
    const dark = colorSchemeContext.colorScheme === 'dark';

    return (
        <div className={dark ? globals.dark_background + ' ' + globals.background : globals.background}>
            <div></div>
            <div></div>
        </div>
    )
}