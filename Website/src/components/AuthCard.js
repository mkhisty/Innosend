'use client'

import { Button, Card, Text, Divider, Anchor } from "@mantine/core"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import styles from '@/css/auth.module.css'
import GoogleSvg from '../../public/google.svg'
import Image from "next/image"
import { useContext } from "react";
import ColorSchemeContext from "@/app/ColorSchemeContext";

export default function AuthCard({ type }) {
    const colorSchemeContext = useContext(ColorSchemeContext)
    const dark = colorSchemeContext.colorScheme === 'dark';

    const { status } = useSession()
    useEffect(() => {
        if(status === "authenticated") {
            redirect('/dashboard')
        }
    }, [status])

    return(
        <Card shadow="xl" radius={"md"} withBorder w={600} className={dark ? styles.darkcard + ' ' + styles.card : styles.card}>
            <Text fw={400} className={styles.cardtitle}>
                {
                    type === 'login' ? 'Login to Your Account' : "Create a New Account"
                }
            </Text>
            <Divider my={"xs"} label="with" labelPosition="center" />
            <Button 
                variant="outline"
                onClick={() => signIn('google')}
                className={styles.cardbutton}
            >
                <Image 
                    priority
                    src={GoogleSvg}
                    height="auto"
                    width={20}
                />
                <Text fw={600}>
                    Google
                </Text>
            </Button>
            <Text className={styles.anchor}>
                {
                    type === 'login' ? "Don't have an account? " : "Already have an account? "
                }
                {
                    type === 'login' ? <Anchor href="/signup">Signup</Anchor> : <Anchor href="/login">Login</Anchor>
                }
            </Text>
        </Card>
    )
}