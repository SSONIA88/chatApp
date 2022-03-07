import { Component, OnInit } from '@angular/core';
import * as io  from 'socket.io-client';


@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
userName='';
message='';
messageList:{message:string,userName:string,mine:boolean}[]=[];
userList:string[]=[];
socket:any



  constructor() { }

  ngOnInit(){}
   
   userNameUpdate(name:string){
     this.socket=io.io(`http://localhost:3000?userName=${name}`);//since in server.js its a query uname
    this.userName=name;
    console.log(name);
    
    this.socket.emit('set-user-name',name);
    this.socket.on('user-List', (userList:string[]) => {
      this.userList=userList;

    });
///messages from server
this.socket.on('message-broadcast', (data: {message:string,userName:string}) => {
    if (data) {
      console.log(data);
      this.messageList.push({message:data.message,userName:data.userName,mine:false})
       }
  });
}

    sendMessage(){
      console.log(this.message);
      
this.socket.emit('message',this.message);
this.messageList.push({message:this.message,userName:this.userName,mine:true})//mine:true since the message is from us
this.message='';
    }
    
  }


  