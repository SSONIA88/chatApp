// //app setting
const app=require('express')();
const cors=require('cors');

const http=require('http').createServer(app);


app.get('/',(req,res)=>res.send('hello!!!'));
// //listen to the connection events for new incoming socket and log into the console
// //integrtating with socket.io
const io=require("socket.io")(http,{
    cors:{
        origin:["http://localhost:4200"],
        methods: ["GET", "POST"]
    }
})
//test server
//for checking whether angular socket client and node socket server connected
// io.on('connection',socket=>{
//     console.log('a user connected');
// })

//just like an arry ,identifiers are unique and u can apply diiferent methods like set,get,clear etc
let userList=new Map();

//port setting
http.listen(3000,()=>{
    console.log('listen to port *:3000');
})
//create method to receive messages from a client and sendthem to other clients in real time
//watch the "message" from client side and emit that message
//socket contains diff. parameters,query,username,unique id etc->basic info abt the client
//message to all other connected clients-->broadcast-->emit action to all connected clients
//if only emit with no broadcast--->only for current connection
io.on('connection',(socket)=>{
       console.log('a user connected');
       let  userName=socket.handshake.query.userName;
       console.log(userName);
       addUser(userName,socket.id);
      
        
        socket.broadcast.emit('user-List', [...userList.keys()]);  //userlist is an array with methods and values
           //.keys()-->passes only strings removing methods since not possible to pass methods
           socket.emit('user-List',[...userList.keys()]);
           //once front end emit message
           socket.on('message', (msg) => {
               socket.broadcast.emit('message-broadcast',{message:msg,userName:userName})
            console.log(msg);
        });
        //to remove client from userlist
      socket.on('disconnect',(reason)=>{
          removeUser(userName,socket.id)
      })
     })

     function addUser(userName,id){
         if(!userList.has(userName)){
             userList.set(userName,new Set(id));

         } else{
             userList.get(userName).add(id);
             console.log(id);
         }
        }

       //delete user once its connected
       function removeUser(userName,id){
        if(userList.has(userName)){
             let userIds= userList.get(userName);
         console.log(userName);
          if(userIds.size!=0){
              userList.delete(userName)
              console.log(`${userName} got disconnected`);
              console.log(userList);
         }

       }
       }