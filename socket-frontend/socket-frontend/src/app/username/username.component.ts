import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  @Output() userNameEvent=new EventEmitter<string>();
userName='';
  constructor() { }

  ngOnInit(): void {
  }

  setUsername():void{
this.userNameEvent.emit(this.userName);
  }
}
