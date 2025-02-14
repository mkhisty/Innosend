import styles from "@/css/chat.module.css"
import { Text } from "@mantine/core"

export default function ChatBubble({ content, sent }) {
    return(
        (
            sent ? 
            <div className={styles.sentbubble}>
                <Text>{content}</Text>
            </div> :
            <div className={styles.recievedbubble}>
                <Text>{content}</Text>
            </div>
        )
    )
}