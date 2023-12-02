import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CartService } from './cart.service';
import { jwtDecode } from 'jwt-decode';
import {  Router } from '@angular/router';
//npm install jwt-decode
//npm audit fix --force

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //Header para afirmar el tipo de contenido JSON
  //URL del API
  ServerUrl = environment.apiURL;
  //Variable observable para gestionar la información del token del usuario, con características especiales
  private tokenUserSubject: BehaviorSubject<any>;
  //Variable observable para gestionar la información del token
  public currentUser: Observable<any>;
  //Booleano para estado de usuario autenticado
  private authenticated = new BehaviorSubject<boolean>(false);
  //Variable observable para obtener la información del usuario
  private usuario = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient, private cartService:CartService,
    private router: Router) {
    //Obtener los datos del usuario en localStorage, si existe
    this.tokenUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    //Establecer un observable para acceder a los datos del usuario
    this.currentUser = this.tokenUserSubject.asObservable();
  }
  //Obtener el valor del usuario actual
  public get tokenUserValue(): any {
    return this.tokenUserSubject.value;
  }
  //Establecer booleano verificando si esta autenticado
  get isAuthenticated() {
    if (this.tokenUserValue != null) {
      this.authenticated.next(true);
    } else {
      this.authenticated.next(false);
    }
    return this.authenticated.asObservable();
  }
  //Crear usuario
  createUser(usuario: any): Observable<any> {
    return this.http.post<any>(
      this.ServerUrl + 'usuario/registrar',
      usuario
    );
  }
  //Decodificar la información del token y obtener la información del usuario
  get decodeToken(): any {
    this.usuario.next(null);
    if (this.tokenUserValue != null ) {
      this.usuario.next(jwtDecode(this.tokenUserValue))
    }
   
    return this.usuario.asObservable();
  }
  
  //Login
  loginUser(usuario: any): Observable<any> {
    return this.http
      .post<any>(this.ServerUrl + 'usuario/login', usuario)
      .pipe(
        map((response) => {
          // almacene los detalles del usuario y el token jwt
          // en el almacenamiento local para mantener al usuario conectado entre las actualizaciones de la página
          
          localStorage.setItem('currentUser', JSON.stringify(response.token));
          this.authenticated.next(true);       
          this.tokenUserSubject.next(response.token);
          let userData=this.decodeToken;
          return userData;
        })
      );
  }
  //Logout de usuario autentificado
  logout() {
    let usuario = this.tokenUserSubject.value;
    if (usuario) {
      // eliminar usuario del almacenamiento local para cerrar la sesión del usuario
      localStorage.removeItem('currentUser');
      //Eliminarlo del observable del usuario actual
      this.tokenUserSubject.next(null);
      //Eliminarlo del observable del boleano si esta autenticado
      this.authenticated.next(false);
      //Eliminar carrito
      this.cartService.deleteCart();
      return true;
    }
    return false;
  }
 
}
