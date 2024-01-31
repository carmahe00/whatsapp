import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class WhatsAppSocket {
    onlineUsers: any[]
    constructor(public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.onlineUsers = []
        this.io = io;
        this.socketEvents()
    }
    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log("Socket io connected successfully")
            socket.on("sendMesssages", (msg) => {
                this.io.emit("receiveMessage", msg)
            })
            // user join or opens application
            socket.on("join", user => {
                socket.join(user)
                //add joined user to online users
                if (!this.onlineUsers.some((u) => u.userId === user)) {
                    this.onlineUsers.push({ userId: user, socketId: socket.id });
                }
                //send online users to frontend
                this.io.emit("get-online-users", this.onlineUsers) // send socket all clients
            })

            // user disconnected
            socket.on("disconnect", () => {
                this.onlineUsers = this.onlineUsers.filter((user) => user.socketId !== socket.id);
                this.io.emit("get-online-users", this.onlineUsers);
            });
            // join conversation room
            socket.on("join conversation", conversation => {
                socket.join(conversation)
            })

            //send and receive message
            socket.on("send message", message => {
                let conversation = message.conversation;
                if (!conversation.users) return
                conversation.users.forEach((user: any) => {
                    if (user._id === message.sender._id) return
                    socket.in(user._id).emit("receive message", message)
                });
            })

            //typing
            socket.on("typing", conversation =>{
                socket.in(conversation).emit("typing", conversation)
            })

            socket.on("stop typing", conversation =>{
                socket.in(conversation).emit("stop typing")
            })  

        });
    }
}

export default WhatsAppSocket