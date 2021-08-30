const mongoose = require('mongoose');
const Msg = require('./models/messages');
const io = require('socket.io')(4000, {cors: {origin: "*"}})
const mongoDB = 'mongodb+srv://AbdulrhmanMohammed:Chatbox135_@cluster0.ojlfi.mongodb.net/Chatbox-DB?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))
io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })
    console.log('a user connected');
    socket.emit('message', 'Hello world');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chatmessage', msg => {
        const message = new Msg({ msg });
        message.save().then(() => {
            io.emit('message', msg)
        })


    })
});