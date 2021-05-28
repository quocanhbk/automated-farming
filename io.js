const io = require('socket.io-emitter')("http://localhost:1234");


io.emit("abc", "hello")