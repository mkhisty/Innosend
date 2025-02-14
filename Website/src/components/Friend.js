import { Avatar, Text } from "@mantine/core"
import { IoIosArrowForward } from "react-icons/io"
import styles from "@/css/dashboard.module.css"

<<<<<<< HEAD
export default function Friend() {
    return(
        <div className={styles.frienddiv}>
            <Avatar size={50} className={styles.friendavatar}/>
            <Text fw={500}>Pradham K.</Text>
=======
export default function Friend({ pfp, name, chatID }) {
    console.log(chatID)
    return(
        <div 
            className={styles.frienddiv} 
            onClick={() => {
                window.location.href = `/chat/${chatID}`
            }}
        >
            <Avatar size={50} className={styles.friendavatar} src={pfp} alt="Friend PFP"/>
            <Text fw={500}>{name}</Text>
>>>>>>> 6b212b14a9f2269b23ae69e9dbdc6c52aa7b673b
            <IoIosArrowForward className={styles.friendarrow}/>
        </div>
    )
}