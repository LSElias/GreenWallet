import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  isAutenticated: boolean;
  currentUser: any;
  id: any;
  reporte: any; 

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }
  
  ngOnInit(): void {
    this.authService.decodeToken.subscribe((user: any) => {
      this.currentUser = user;
    });

    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    if(this.currentUser.rol === 1){
      this.router.navigate(['centro/general']);
    }
    if(this.currentUser.rol === 2){
      this.router.navigate(['centro/acopio']);
    }

  }

}
