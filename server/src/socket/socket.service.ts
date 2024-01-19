import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { IUserCacheData } from 'src/interfaces';

@Injectable()
export class SocketService {

    private readonly connectedUsers: Map<string, IUserCacheData> = new Map()

    handleConnection(socket: Socket): void {
        const clientId = socket.id
        this.connectedUsers.set(clientId, {
            socket,
            locationLatitude: null,
            locationLongitude: null,
            user: null,
        })
        socket.on('disconnect', () => {
            this.connectedUsers.delete(clientId)
        })
    }
}