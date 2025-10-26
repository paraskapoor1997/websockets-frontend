import io from 'socket.io-client';

export const createSocketConnection = () => {
    if(location.hostname ==='localhost'){
        return io(`${process.env.REACT_APP_API_URL}`); // Backend server URL
    }else{
        return io('/', {path: '/api/socket.io'});
    }
};