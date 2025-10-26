import io from 'socket.io-client';

export const createSocketConnection = () => {
    return io(`${process.env.REACT_APP_API_URL}`); // Backend server URL
};