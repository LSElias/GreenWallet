import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';

interface Provincia {
  id: string;
  value: string;
}

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css'],
})
export class UsuarioCreateComponent implements OnInit {
  hide = true;
  usuario: any;
  rol: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  provincias: Provincia[];
  cantones: any;
  numRegex = '^[0-9]*$';
  destroy$: Subject<boolean> = new Subject<boolean>();
  activeRouter: any;
  provin: any;
  canto: any;
  submitted= false;
  respCreate: any; 
  genericService: any;
  distritos: any; 
  provinciaId: any;
  cantonId: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
    this.listaProvincias();
    this.listaCantones();
    this.listaDistrito();
    this.getInfo();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      rol: [null, null],
      provinciaValue: [null,null],
      cantonValue: [null,null],
      distritoValue: [null,null],      
      nombre: ['',  Validators.compose([Validators.required, Validators.minLength(5)]),],
      apellido1: ['',  Validators.compose([Validators.required, Validators.minLength(5)]),],
      apellido2: ['',  Validators.compose([Validators.required, Validators.minLength(5)]),],
      correo: ['', [Validators.required,Validators.email]],
      contrasena: ['', [Validators.required]],
      cedula: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      telefono: ['',  Validators.compose([
        Validators.required,
        Validators.pattern(this.numRegex),
        Validators.minLength(8),
        Validators.maxLength(8),]),
      ],
      provincia: [null, Validators.required],
      canton: [null, Validators.required],
      distrito: [null, Validators.required],
      senas: [null,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  ngOnInit(): void {}

  submitForm(): void  { 
     this.submitted = true;
     
    this.provincias.forEach(element => {
      if(element.id == this.formCreate.get('provincia').value){
        this.formCreate.patchValue({provinciaValue: element.value})
      }
    });

    this.cantones.forEach(element => {
      if(element.id == this.formCreate.get('canton').value){
        this.formCreate.patchValue({cantonValue: element.value})
      }
    });

    this.formCreate.get("rol").setValue(this.rol);

    //Validación
    if (this.formCreate.invalid) {
      return;
    }

    console.log(this.formCreate.value)
    //Registrar usuario
    this.authService
      .createUser(this.formCreate.value)
      .subscribe((respuesta: any) => {
        this.respCreate = respuesta;
        this.noti.mensajeRedirect(
          'Usuario',
          'Usuario creado ',
          TipoMessage.success,
          '/'
        );
      this.router.navigate(['/usuario/login']);
      });
  }

  listaProvincias() {
    let prov: Provincia[] = [];
    let jsonresponse: any;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://ubicaciones.paginasweb.cr/provincias.json');
    request.send();
    request.onload = () => {
      if (request.status == 200) {
        jsonresponse = JSON.parse(request.response);
        for (var key in jsonresponse) {
          var value = jsonresponse[key];
          prov.push({ id: key, value: value });
        }
        this.provincias = prov;
      } else {
        console.log('error — provs');
      }
    };
  }

  listaCantones(id?: any) {
    let cant: Provincia[] = [];
    let jsonresponse: any;
    let request = new XMLHttpRequest();

    if (id != null && !Number.isNaN(id)) {
      let request = new XMLHttpRequest();
      request.open(
        'GET',
        `https://ubicaciones.paginasweb.cr/provincia/${id}/cantones.json`
      );
      request.send();
      request.onload = () => {
        if (request.status == 200) {
          jsonresponse = JSON.parse(request.response);
          for (var key in jsonresponse) {
            var value = jsonresponse[key];
            cant.push({ id: key, value: value });
          }
          this.cantones = cant;
        } else {
          console.log('error — cantones');
        }
      };
    }
  }

  listaDistrito() {
    let dist : Provincia[] = []
    let jsonresponse: any;
    let request = new XMLHttpRequest();

    if(this.provincias!=null){
      this.provincias.forEach(element => {
        if(element.id == this.formCreate.get('provincia').value){
          this.formCreate.patchValue({provinciaValue: element.value})
          this.provinciaId = element.id; 
        }
      });
    }
      if (this.cantones != null) {
        this.cantones.forEach(element => {
          if(element.id == this.formCreate.get('canton').value){
            this.formCreate.patchValue({cantonValue: element.value})
            this.cantonId = element.id; 
          }
        });
      }

    if (this.provinciaId != null && !Number.isNaN(this.provinciaId)) {
      let request = new XMLHttpRequest();
      request.open(
        'GET',
        `https://ubicaciones.paginasweb.cr/provincia/${this.provinciaId}/canton/${this.cantonId}/distritos.json`
      );
      request.send();
      request.onload = () => {
        if (request.status == 200) {
          jsonresponse = JSON.parse(request.response);
          for (var key in jsonresponse) {
            var value = jsonresponse[key];
            dist.push({ id: key, value: value });
          }
          this.distritos = dist;
        } else {
          console.log('error — distrito');
        }
      };
    }
  }









  getInfo(){
    var id= 3
    this.gService.get('datos/rol', id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      console.log(response);
      this.rol=response;
    });
  }

  onReset() {
    this.formCreate.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
