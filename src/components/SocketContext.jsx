// import React, { createContext, useContext, useEffect, useState } from 'react';
// import io from 'socket.io-client';

// // Create a context
// const SocketContext = createContext();

// // Custom hook to use the socket context
// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);

//     // Connect to your WebSocket server
//     useEffect(() => {
//         const newSocket = io('https://myredd-api.onrender.com', {
//             // Additional options if necessary
//             transports: ['websocket'],
//             // For example, send authorization token (if needed):
//             // auth: { token: 'your_token_here' }
//         });

//         setSocket(newSocket);

//         return () => newSocket.close();  // Clean up on component unmount
//     }, []);

//     return (
//         <SocketContext.Provider value={socket}>
//             {children}
//         </SocketContext.Provider>
//     );
// };
