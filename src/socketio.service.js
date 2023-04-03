import { io } from 'socket.io-client'

import { BASE_API_2 } from './utils/base_url.config'
//import Cookies from 'js-cookie'

let socket

export const initSocketConnection = () => {
    let getToken = localStorage.getItem('_tk')
    socket = io(BASE_API_2, {
        transports: ['websocket'],
        upgrade: false,
        auth: { token: getToken },
    })
    return socket
}
