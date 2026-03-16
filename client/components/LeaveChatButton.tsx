import "../styles/LeaveChatButton.css"
import Button from '@mui/material/Button';
import EVENTS from '@/config/events';
import { useSocket } from "@/context/socket.context"

const LeaveChatButton = () => {
    const { socket, roomID } = useSocket();

    const handleLeaveChatClick = () => {
        socket.emit(EVENTS.CLIENT.LEAVE_ROOM, {roomID});
    }
    
    return (
        <div className="leave-room-button">
            <Button 
                onClick={handleLeaveChatClick}
                sx={{
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                }}
            >
                Leave Room
            </Button>
        </div>
    )
}

export default LeaveChatButton