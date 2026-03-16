'use client';

import '../styles/LoginFields.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EVENTS from '@/config/events';
import { useEffect, useState } from 'react';
import { useSocket } from '@/context/socket.context';
import { Divider } from '@mui/material';

const LoginFields = () => {
    
  const { socket, setUsername, roomID } = useSocket();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [roomIDInput, setRoomIDInput] = useState<string>("");

  const handleUsernameChange = (e: any) => {
    setUsernameInput(e.target.value);
  };

  const handleRoomChange = (e: any) => {
    setRoomIDInput(e.target.value);
  };

  const handleJoinRoomClick = () => {
    setUsername(usernameInput);
    sessionStorage.setItem('username', usernameInput);
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, {
      roomID: roomIDInput,
      username: usernameInput,
      socketID: socket.id,
    });
  };

  const handleCreateRoomClick = () => {
    setUsername(usernameInput);
    sessionStorage.setItem('username', usernameInput);
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { username: usernameInput });
  };

  useEffect(() => {
    setUsername(sessionStorage.getItem('username') || '');
    setUsernameInput(sessionStorage.getItem('username') || '');
    setRoomIDInput(roomID || '');
  }, []);

  return (
    <div className="login-fields">
      <TextField
        onChange={handleUsernameChange}
        required
        id="username-input"
        label="Username"
        variant="outlined"
        value={usernameInput}
        fullWidth
        inputProps={{ maxLength: 16 }}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#e0e6f5',
            '& fieldset': {
              borderColor: '#2a3052',
            },
            '&:hover fieldset': {
              borderColor: '#3d4572',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3d4572',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b8d4',
            '&.Mui-focused': {
              color: '#3d4572',
            },
          },
        }}
      />

      <TextField
        onChange={handleRoomChange}
        required
        id="room-input"
        label="Room ID (optional)"
        variant="outlined"
        value={roomIDInput}
        fullWidth
        inputProps={{ maxLength: 10 }}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#e0e6f5',
            '& fieldset': {
              borderColor: '#2a3052',
            },
            '&:hover fieldset': {
              borderColor: '#3d4572',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3d4572',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b8d4',
            '&.Mui-focused': {
              color: '#3d4572',
            },
          },
        }}
      />

      <div className="room-buttons">
        <Button
          variant="contained"
          disabled={!usernameInput || !roomIDInput}
          onClick={handleJoinRoomClick}
          sx={{
            background: 'linear-gradient(135deg, #3d4572 0%, #4e5a8a 100%)',
            color: '#e0e6f5',
            fontWeight: 600,
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            textTransform: 'none',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #4e5a8a 0%, #5f6b9c 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(61, 69, 114, 0.4)',
            },
            '&.Mui-disabled': {
              background: '#0f1220',
              color: '#4a5070',
              opacity: 0.5,
              cursor: 'not-allowed',
            },
          }}
        >
          Join Room
        </Button>

        <Divider sx={{ bgcolor: '#2a3052', my: 1 }} />

        <Button
          variant="contained"
          disabled={!usernameInput}
          onClick={handleCreateRoomClick}
          sx={{
            background: 'linear-gradient(135deg, #3d4572 0%, #4e5a8a 100%)',
            color: '#e0e6f5',
            fontWeight: 600,
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            textTransform: 'none',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #4e5a8a 0%, #5f6b9c 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(61, 69, 114, 0.4)',
            },
            '&.Mui-disabled': {
              background: '#0f1220',
              color: '#4a5070',
              opacity: 0.5,
              cursor: 'not-allowed',
            },
          }}
        >
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default LoginFields;
