import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html'
})
export class Contact {
  sendContact():void{
    const inputName = (document.getElementById("name") as HTMLInputElement).value;
    const inputEmail = (document.getElementById("email") as HTMLInputElement).value;
    const tdphanhoi = document.getElementById("tdphanhoi") 
    alert("Contact sent!+[Name: "+inputName+" ");
  }

}
