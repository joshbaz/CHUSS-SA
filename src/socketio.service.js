import { io } from 'socket.io-client'

import { BASE_API_ } from './utils/base_url.config'
import Cookies from 'js-cookie'

let socket

export const initSocketConnection = () => {
    let getToken = Cookies.get('_tk')
    socket = io(BASE_API_, {
        transports: ['websocket'],
        upgrade: false,
        auth: { token: getToken },
    })
    return socket
}
