# ShieldChat

A real-time chat application with end-to-end encryption, allowing users to chat securely in isolated rooms.

## Features

- **Real-time messaging** with WebSocket communication
- **Room-based chat** - Create or join rooms with unique IDs
- **End-to-end encryption** - Text messages encrypted with AES-256-CBC
- **Image sharing** - Send and view images in real-time
- **Active user list** - See who's online in your room
- **Responsive design** - Works on desktop and mobile

## Tech Stack

**Client:**
- Next.js 14 (React)
- Material-UI components
- Socket.IO client
- AES encryption support

**Server:**
- Express.js
- Socket.IO
- Node.js

## Prerequisites

- [Node.js](https://nodejs.org/) (latest version)
- [Yarn](https://yarnpkg.com/) package manager

## Installation & Setup

### Server Setup

```bash
cd server
yarn install
yarn dev
```

The server runs on `http://localhost:4000`

### Client Setup

```bash
cd client
yarn install
yarn dev
```

The client runs on `http://localhost:3000`

## How to Use

1. **Start both server and client** in separate terminals
2. **Enter a username** in the login screen
3. **Create a room** to start chatting (generates unique ID) OR **join an existing room** with its ID
4. **Share the room ID** with others to let them join
5. **Send text messages** or **upload images** using the buttons
6. **Leave the room** anytime using the Leave Room button

## File Structure

```
ChatApplication/
├── client/              # Next.js frontend
│   ├── components/      # React components
│   ├── context/         # Socket.IO context
│   ├── styles/          # CSS files
│   └── assets/          # Images and logos
│
├── server/              # Express backend
│   └── src/
│       └── app.ts       # Main server file
│
└── README.md
```

## Security

- Messages are encrypted client-side before sending to server
- Server never sees plaintext messages (end-to-end encryption)
- Each room is isolated from others
- Random IV (initialization vector) for each message
