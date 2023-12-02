import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  isAutenticated: boolean;
  currentUser: any;
  qtyItems:Number = 0;
  id:any;
 

 constructor(
  private router: Router,
  private cartService: CartService,
  private authService: AuthenticationService) {      
  this.qtyItems=this.cartService.quantityItems()
}

  redirect(id:any){
    document.location.href = `${id}`;
  }

  login(){
    this.router.navigate(['usuario/login']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['inicio']);
  }
}
