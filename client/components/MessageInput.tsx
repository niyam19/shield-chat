import "../styles/MessageInput.css"
import { Button, TextField } from '@mui/material';
import { useState } from 'react'
import { useSocket } from "@/context/socket.context"
import UploadButton from "./UploadButton";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EVENTS from '@/config/events';
import crypto from 'crypto'

const MessageInput = () => {

    const { socket, username, messages, setMessages, roomID, aesKey } = useSocket();
    const [ textInput, setTextInput ] = useState("");

    const handleChange = (e: any) => {
        setTextInput(e.target.value);
    };
    
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") { 
            handleSendClick();
        }
    };

    const handleSendClick = () => {
        if (textInput.length < 1) {
            return;
        }

        const date = new Date();
        const timestamp = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });;

        const iv = crypto.randomBytes(16);
        const ivString = iv.toString('hex');
        const encryptedMessage = encrypt(textInput, iv);
        setMessages([...messages, {type: "text", username: username, body: textInput, timestamp: timestamp}]);
        socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {type: "text", roomID: roomID, username: username, body: encryptedMessage, timestamp: timestamp, iv: ivString});    

        setTextInput("");
    };

    const encrypt = (text: string, iv: any) => {
        const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
        let encryptedMessage = cipher.update(text, 'utf-8', 'hex');
        encryptedMessage += cipher.final('hex');

        return encryptedMessage;
    };

    return (
        <div className="message-input">
            <UploadButton />
            <TextField
                sx={{ 
                    flex: 1,
                    input: { color: "#e0e6f5" }, 
                    label: { color: "#b0b8d4" },
                    "& .MuiInputLabel-root": {
                        color: '#b0b8d4'
                    }, 
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: '#3d4572'
                    },
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "#2a3052" },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                            borderColor: "#3d4572",
                            color: "#e0e6f5"
                        }
                    },
                    "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                            borderColor: "#3d4572"
                        }
                    },
                }}
                value={textInput}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Type a message..."
                fullWidth
                inputProps={{ maxLength: 2048 }}
            />
            <Button
                className="send-message-button"
                sx={{
                    color: "#e0e6f5",
                    padding: '0.5rem',
                    minWidth: 'auto',
                    ':hover': {
                        bgcolor: 'transparent', 
                        color: '#3d4572',
                        transform: 'scale(1.1)',
                    }
                }}
                onClick={handleSendClick}
            >
                <SendOutlinedIcon /> 
            </Button>
        </div>
    )
}

export default MessageInput