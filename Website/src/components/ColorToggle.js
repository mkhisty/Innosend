'use client'

import { Button } from "@mantine/core"
import { CiLight } from "react-icons/ci";
import { MdNightlightRound } from "react-icons/md";
import { useContext } from "react";
import ColorSchemeContext from "@/app/ColorSchemeContext";
import styles from "@/css/page.module.css"

export default function ColorToggle() {
    const colorSchemeContext = useContext(ColorSchemeContext)
    const dark = colorSchemeContext.colorScheme === 'dark';

    return(
        <Button
            className={styles.colortoggle}
            onClick={() => {colorSchemeContext.onChange(dark ? 'light' : 'dark'); localStorage.setItem('preference', dark ? 'light' : 'dark')}} 
            h={"auto"}
            variant="gradient"
            gradient={{ from: "#3275e3", to: "#26e7e3", deg: -90 }}
        >
            {
                dark ? <MdNightlightRound size={30} /> : <CiLight size={30}/>
            }
      </Button>
    )
}