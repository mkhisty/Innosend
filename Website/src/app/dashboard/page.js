'use client'

import { useSession } from "next-auth/react"
import { Grid, Card, Divider, Space, Avatar, Text, Loader, Button, Input } from "@mantine/core"
import styles from "@/css/dashboard.module.css"
import Background from "@/components/Background"
import ColorToggle from "@/components/ColorToggle"
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
<<<<<<< HEAD
import { useState } from "react"
=======
import { useEffect, useState } from "react"
>>>>>>> 6b212b14a9f2269b23ae69e9dbdc6c52aa7b673b
import Friend from "@/components/Friend"
import { signOut } from "next-auth/react"

export default function Dashboard() {
    const { data: session, status } = useSession()
    const [copied, setCopied] = useState(false)
    const [errorInput, setErrorInput] = useState(false)
<<<<<<< HEAD
=======
    const [friendCode, setFriendCode] = useState(null)
    const [friends, setFriends] = useState([])

    function addFriend() {
        if(friendCode.length !== 6) {
            setErrorInput(true)
            return
        }
        fetch('/api/addFriend', {
            method: "POST",
            body: JSON.stringify({
                friendCode: friendCode,
                myCode: session.user.friendCode
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
        .then((data) => {
            if(data['error']) {
                console.log(data['error'])
                return
            }
            setErrorInput(false)
            setFriends([...friends, data])
            setFriendCode('')
            document.getElementById('input').value = ""
        })
    }

    useEffect(() => {
        if(status !== 'authenticated') {
            return
        }
        fetch('/api/getFriends', {
            method: 'POST',
            body: JSON.stringify({
                friendCode: session.user.friendCode,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
        .then(data => {
            if(data['error']) {
                console.log(data['error'])
                return
            }
            const friendData = data.friendData
            setFriends(friendData)
        })
    }, [status])
>>>>>>> 6b212b14a9f2269b23ae69e9dbdc6c52aa7b673b

    return(
        <>
            {
                session ?
                <Grid className={styles.maingrid} justify="center">
                    <Grid.Col span={6}>
                        <Card withBorder className={styles.friendscard}>
                            <Text fw={700} className={styles.friendstitle}>
                                Friends List
                            </Text>
                            <Divider />
                            <Card.Section>
<<<<<<< HEAD
                                <Friend />
                                <Friend />
                                <Friend />
=======
                                {
                                    friends.map((friend, i) => {
                                        return <Friend 
                                                    pfp={friend.pfp} 
                                                    name={friend.name} 
                                                    chatID={friend.chatID}
                                                    key={i} 
                                                />
                                    })
                                }
>>>>>>> 6b212b14a9f2269b23ae69e9dbdc6c52aa7b673b
                            </Card.Section>
                            <Button 
                                className={styles.logout}
                                size="md"
                                variant="outline"
                                color="red"
                                onClick={(e) => {signOut({ callbackUrl: '/login' })}}
                            >
                                Logout
                            </Button>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card withBorder className={styles.sidecard}>
                            <Card.Section className={styles.userinfodiv}>
                                <Avatar 
                                    src={session.user.pfp}
                                    alt="User PFP"
                                    size={60}
                                />
                                <Text fw={600}>
                                    Welcome, {session.user.name}
                                </Text>
                            </Card.Section>
                            <Divider />
                            <Card.Section className={styles.uicdiv}>
                                <Text className={styles.uictext} fw={500}>
                                    Your Friend Code: 
                                    <Button 
                                        variant="light"
                                        leftSection={copied ? <FaCheck /> : <FaRegCopy />}
                                        onClick={(e) => { 
                                            setCopied(true); 
                                            navigator.clipboard.writeText(session.user.friendCode);
                                            setTimeout(() => {
                                                setCopied(false)
                                            }, 1500)
                                        }}
                                        className={styles.copybutton}
                                    >
                                        {session.user.friendCode}
                                    </Button>
                                </Text>
                            </Card.Section>
                            <Divider />
                            <Card.Section className={styles.uac}>
                                <Text fw={500}>
                                    Account Created: {session.user.created}
                                </Text>
                                <Text fw={500}>
                                    # of Friends: {session.user.friends.length}
                                </Text>
                            </Card.Section>
                        </Card>
                        <Space h="lg" />
                        <Card withBorder className={styles.sidecard}>
                            <Text className={styles.addtitle} fw={600}>
                                🤝 Add a Friend 🤝
                            </Text>
                            <Divider />
                            <Card.Section className={styles.addmain}>
                                <Text fw={500}>
                                    In order to add a friend, you must enter that person's friend code below.
                                </Text>
                                <Input 
                                    w={"fit-content"}
                                    placeholder="Friend Code" 
                                    leftSection={<MdAlternateEmail size={20}/>} 
                                    className={styles.input}
                                    error={errorInput}
<<<<<<< HEAD
=======
                                    onChange={(e) => setFriendCode(e.currentTarget.value)}
                                    id="input"
>>>>>>> 6b212b14a9f2269b23ae69e9dbdc6c52aa7b673b
                                />
                                <Button 
                                    variant="outline"
                                    leftSection={<IoPersonAddOutline />}
                                    className={styles.buttondiv}
<<<<<<< HEAD
=======
                                    onClick={addFriend}
>>>>>>> 6b212b14a9f2269b23ae69e9dbdc6c52aa7b673b
                                >
                                    Add Friend
                                </Button>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                </Grid> :
                <Loader color="blue" type="bars" size={"xl"} className={styles.loader}/>
            }
            <Background />
            <ColorToggle />
        </>
    )   
}