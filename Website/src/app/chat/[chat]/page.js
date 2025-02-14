'use client'

import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import ColorToggle from "@/components/ColorToggle";
import { Grid, Card, Divider, Text, Button, Textarea, Avatar, Code, Modal } from "@mantine/core";
import styles from "@/css/chat.module.css"
import { useDisclosure } from "@mantine/hooks";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import ChatBubble from "@/components/ChatBubble";
import { useSession } from "next-auth/react";
import io from "socket.io-client"
import { IoIosArrowBack } from "react-icons/io";

export default function Chat({ params }) {
    const chatID = params.chat;
    const { data: session, status } = useSession()
    const [message, setMessage] = useState('')
    let [chats, setChats] = useState([])
    const [name, setName] = useState('User')
    let [socket, setSocket] = useState(null)
    const [friend, setFriend] = useState({})
    const router = useRouter()
    const [error, setError] = useState(false)
    const [opened, { open, close }] = useDisclosure(false);

    function sendMessage() {
        if(message.length === 0) {
            return
        }
        fetch('/api/sendMessage', {
            method: 'POST',
            body: JSON.stringify({
                message: message,
                sender: session.user.friendCode,
                chatID: chatID,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then((data) => {
            if(data['error']) {
                console.log(data['error'])
                return
            }
            const arr = [
                data['data'],
                ...chats,
            ].sort((a, b) => {
                return new Date(b.sent) - new Date(a.sent)
            }).reverse()
            chats = arr
            setChats(chats)
            socket.emit('message', JSON.stringify(data['data']))
            setMessage('')
            document.getElementById('textarea').value = '';
        })
    }

    useEffect(() => {
        if(!session) { return }
        fetch('/api/initSocket').then(_res => {})
        fetch('/api/getMessages', {
            method: 'POST',
            body: JSON.stringify({
                chatID: chatID,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            if(data['error']) {
                console.log(data['error'])
                return
            }
            setName(`${data['data'].authUsers[0].username} and ${data['data'].authUsers[1].username}'s Chat`)
            const arr = data['data'].chatLog.sort((a, b) => {
                return new Date(b.sent) - new Date(a.sent)
            }).reverse()
            chats = arr
            setChats(chats)

            setFriend(data['users'].filter(user => user.friendCode !== session.user.friendCode)[0])
        })
        socket = io('http://localhost:8080')
        setSocket(socket)
        socket.on('connect', () => {
            console.log('user connected')
        })

        socket.on('message', (data) => {
            const messageData = JSON.parse(data)
            if(messageData.sender === session.user.friendCode) {
                return
            }
            const arr = [
                messageData,
                ...chats,
            ].sort((a, b) => {
                return new Date(b.sent) - new Date(a.sent)
            }).reverse()
            chats = arr
            setChats(chats)
        })
    }, [session])

    return(
        <>
            <Grid justify="center" className={styles.maingrid}>
                <Grid.Col span={7}>
                    <Card withBorder className={styles.chatdiv}>
                        <Card.Section className={styles.chattitlediv}>
                            <Button 
                                variant="subtle" 
                                className={styles.chattitlearrow}
                                onClick={() => window.location.href = '/dashboard'}
                            >
                                <IoIosArrowBack size={30}/>
                            </Button>
                            <Text fw={600} className={styles.chattitle}>
                                {name}
                            </Text>
                        </Card.Section>
                        <Divider />
                        <Card.Section className={styles.chatcontent}>
                            {
                                chats.map((chat, i) => {
                                    return <ChatBubble 
                                                key={i}
                                                content={chat.message} 
                                                sent={session && chat.sender === session.user.friendCode ? true : false}
                                            />
                                })
                            }
                        </Card.Section>
                        <Divider />
                        <Card.Section className={styles.sendarea}>
                            <Textarea 
                                label="Send a Message"
                                autosize
                                minLength={1}
                                maxRows={5}
                                onChange={(e) => setMessage(e.currentTarget.value)}
                                id="textarea"
                                error={error}
                            />
                            <Button
                                onClick={sendMessage}
                            >
                                <IoIosSend size={25}/>
                            </Button>
                        </Card.Section>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Card withBorder className={styles.frienddiv}>
                        <Avatar 
                            src={friend.pfp}
                            alt="Friend PFP"
                            className={styles.friendavatar}
                            size={80}
                        />
                        <Text className={styles.friendname} fw={700}>
                            {friend.name}
                        </Text>
                        <Text className={styles.ac} fw={700}>
                            Account Created: <br />
                            <Code className={styles.code} color="var(--mantine-color-blue-light)">
                                {friend.created}
                            </Code>
                        </Text>
                    </Card>
                </Grid.Col>
            </Grid>
            <Background />
            <ColorToggle />
            <Modal opened={opened} onClose={close} title="Bad Message" color="red">
                <Text
                    fw={600}
                    style={{ textAlign: "center" }}
                >
                    This message has inappropriate/harmful text.
                </Text>
            </Modal>
        </>
    )
}