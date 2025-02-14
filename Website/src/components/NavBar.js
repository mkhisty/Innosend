'use client'

import { Container, Image, Button, Burger, Group, Avatar, Menu } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react"
import styles from "../css/navbar.module.css"
import { useDisclosure } from '@mantine/hooks';
import { CiLogout } from "react-icons/ci";
import { useContext } from 'react';
import ColorSchemeContext from '@/app/ColorSchemeContext';

export default function NavBar() {
    const router = useRouter();
    const [opened, { toggle }] = useDisclosure();
    const { data: session, status } = useSession();
    const colorSchemeContext = useContext(ColorSchemeContext);
    const dark = colorSchemeContext.colorScheme === 'dark';

    return(
        <>
            <Container fluid className={styles.container}>
                <div className={styles.imagediv}>
                    <Image 
                        src="/innosend.png"
                        fit='contain'
                        h={80}
                        className={styles.navimage}
                        onClick={() => router.push('/')}
                    />
                </div>
                
                <nav className={styles.navlinks}>
                    {
                        status === "authenticated" ? 
                        <>
                            <a href='/dashboard' style={{ color: dark ? 'white' : 'black' }}>Dashboard</a>
                            <Menu 
                                shadow="xl" 
                                width={100} 
                                trigger='hover'
                                transitionProps={{ transition: 'rotate-right', duration: 150 }}
                            >
                                <Menu.Target>
                                    <Avatar 
                                        src={session.user.pfp} 
                                        alt="User Profile Picture" 
                                        radius={"xl"} 
                                        size={"md"}
                                        variant="filled"
                                        className={styles.avatar}  
                                    />
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        color='red'
                                        leftSection={<CiLogout />}
                                        onClick={() => {signOut(); router.push('/login')}}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </> : 
                        <>
                            <a href='/signup' style={{ color: dark ? 'white' : 'black' }}>Signup</a>
                            <Button 
                                variant='gradient' 
                                gradient={{ from: "#3275e3", to: "#26e7e3", deg: -90 }}
                                onClick={() => router.push('/login')}
                                size="lg"
                                className={styles.login}
                            >
                                Login
                            </Button>
                        </>
                    }
                </nav>
                <Burger 
                    opened={opened}
                    onClick={toggle}
                    className={styles.burger}
                    hiddenFrom="sm"
                />
            </Container>
            <Group className={opened ? styles.mobilenavopen : styles.mobilenavclose} hiddenFrom='sm'>
                <a href="/dashboard" style={{ color: dark ? 'white' : 'black' }}>Dashboard</a>
                <a href="/signup" style={{ color: dark ? 'white' : 'black' }}>Signup</a>
                <a href="/login" style={{ color: dark ? 'white' : 'black' }}>Login</a>
            </Group>
        </>
    )
}