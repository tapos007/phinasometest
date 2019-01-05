const express = require('express');
const mongoose = require('mongoose');
const cons = require('consolidate');
const http = require('http');
const socketIO = require('socket.io');
const  birds = require('./birds')
const config = require('./config/database');
const user_controller = require('./controllers/user.controller');
require('express-async-errors');
const app = express();
app.engine('html', cons.nunjucks);

// set .html as the default extension

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection',  (socket) => {
    
    socket.on('firstTimeEvent',  async function(data) {
       await  user_controller.updateSocketId(data.name,data.socketId);
    });

});

const user = require('./routes/user.route');
const port = 3000;
mongoose.connect(config.database,{useNewUrlParser: true});
app.use('/birds', birds);
app.use('/users', user);
app.get('/connecteduser/:userId', function (req, res) {
    res.render('index', { userId: req.params.userId});
  });


server.listen(port, () => console.log(`Example app listening on port ${port}!`));