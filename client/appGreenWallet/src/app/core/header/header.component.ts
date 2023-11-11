import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
   id:any;

  constructor(){

  }

  redirect(id:any){
    document.location.href = `${id}`;
  }
}
