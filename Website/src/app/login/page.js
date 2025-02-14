'use client'

import AuthCard from "@/components/AuthCard"
import NavBar from "@/components/NavBar"
import ColorToggle from "@/components/ColorToggle"
import Background from "@/components/Background"
import styles from "@/css/auth.module.css"

export default function Login() {
    return(
        <>
            <NavBar />
            <div className={styles.carddiv}>
                <AuthCard type={"login"} />
            </div>
            <Background />
            <ColorToggle/>
        </>
    )
}