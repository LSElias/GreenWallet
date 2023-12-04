import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';

interface Provincia {
  id: string;
  value: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

    destroy$: Subject<boolean> = new Subject<boolean>();
    titleForm: string = 'Crear';
    userInfo: any;
    crearAdminForm: FormGroup;
    idUsuario: number = 0;
    isCreate: boolean = true;
    numRegex = '^[0-9]*$';
    file: any;
    provincias: Provincia[];
    cantones: any;
    provin: any;
    canto: any;
    makeSubmit: boolean;
    rolList: any;
    distritos: any;
    provinciaId: any;
    cantonId: any;
  
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private gService: GenericService,
      private authService: AuthenticationService,
      private activeRouter: ActivatedRoute,
      private noti: NotificacionService
    ) {
      this.reactiveForm();
      this.listaProvincias();
      this.listaCantones();
      this.listaDistrito();
      this.listaRoles();
    }
  
    reactiveForm() {
      this.crearAdminForm = this.fb.group({
        id: [null, null],
        rol: [null, Validators.required],
        rolValue: [null, null],
        provinciaValue: [null, null],
        cantonValue: [null, null],
        distritoValue: [null, null],
        nombre: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        apellido1: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        apellido2: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required]],
        cedula: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        telefono: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(this.numRegex),
            Validators.minLength(8),
            Validators.maxLength(8),
          ]),
        ],
        provincia: [null, Validators.required],
        canton: [null, Validators.required],
        distrito: [null, Validators.required],
        senas: [
          null,
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
      });
    }
  
    /*Modificar*/
    ngOnInit(): void {
      this.activeRouter.params.subscribe((params: Params) => {
        //this.idUsuario = params['id'];
        this.idUsuario = 3; 
        if (this.idUsuario != undefined && !isNaN(Number(this.idUsuario))) {
          this.isCreate = false;
          this.titleForm = 'Actualizar';
          this.gService
            .get('usuario/idU', this.idUsuario)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
              this.userInfo = data;
              // console.log(this.userInfo);
              this.crearAdminForm.setValue({
                id: this.userInfo.idUsuario,
                nombre: this.userInfo.nombre,
                apellido1: this.userInfo.apellido1,
                apellido2: this.userInfo.apellido2,
                correo: this.userInfo.correo,
                contrasena: '******',
                cedula: this.userInfo.cedula,
                telefono: this.userInfo.telefono,
                rol: this.userInfo.idRol,
                rolValue: this.userInfo.rol,
                provincia: 0,
                provinciaValue: this.userInfo.provincia,
                canton: 0,
                cantonValue: this.userInfo.canton,
                distrito: 0,
                distritoValue: this.userInfo.distrito,
                senas: this.userInfo.senas,
              });
              this.setProvincias();
              this.listaRoles();
            });
        }
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
      let dist: Provincia[] = [];
      let jsonresponse: any;
      let request = new XMLHttpRequest();
  
      if (this.provincias != null) {
        this.provincias.forEach((element) => {
          if (element.id == this.crearAdminForm.get('provincia').value) {
            this.crearAdminForm.patchValue({ provinciaValue: element.value });
            this.provinciaId = element.id;
          }
        });
      }
      if (this.cantones != null) {
        this.cantones.forEach((element) => {
          if (element.id == this.crearAdminForm.get('canton').value) {
            this.crearAdminForm.patchValue({ cantonValue: element.value });
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
  
    listaRoles() {
      this.rolList = null;
      this.gService
        .list('datos/rol')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.rolList = data;
        });
    }
  
    setProvincias() {
      let realkey: any;
      let jsonresponse: any;
      let request = new XMLHttpRequest();
      request.open('GET', 'https://ubicaciones.paginasweb.cr/provincias.json');
      request.send();
      request.onload = () => {
        if (request.status == 200) {
          jsonresponse = JSON.parse(request.response);
          for (var key in jsonresponse) {
            var value = jsonresponse[key];
  
            if (value == this.crearAdminForm.get('provinciaValue').value) {
              this.crearAdminForm.get('provincia').setValue(key);
            }
          }
          this.getCantones(this.crearAdminForm.get('provincia').value);
        } else {
          console.log('error — provs');
        }
      };
    }
  
    getCantones(id?: any) {
      this.listaCantones(id);
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
              if (value == this.crearAdminForm.get('cantonValue').value) {
                this.crearAdminForm.get('canton').setValue(key);
                console.log(this.crearAdminForm.get('canton').value);
              }
            }
            this.getDistrito(
              this.crearAdminForm.get('id').value,
              this.crearAdminForm.get('canton').value
            );
          } else {
            console.log('error — cantones');
          }
        };
      }
    }
  
    getDistrito(idPro?: any, idCant?: any) {
      this.listaDistrito();
      let jsonresponse: any;
      let request = new XMLHttpRequest();
      if (idPro != null && !Number.isNaN(idPro)) {
        let request = new XMLHttpRequest();
        request.open(
          'GET',
          `https://ubicaciones.paginasweb.cr/provincia/${idPro}/canton/${idCant}/distritos.json`
        );
        request.send();
        request.onload = () => {
          if (request.status == 200) {
            jsonresponse = JSON.parse(request.response);
            for (var key in jsonresponse) {
              var value = jsonresponse[key];
              if (value == this.crearAdminForm.get('distritoValue').value) {
                this.crearAdminForm.get('distrito').setValue(key);
                console.log(this.crearAdminForm.get('distrito').value);
              }
            }
          } else {
            console.log('error — distrito');
          }
        };
      }
    }
  
    onBack() {
      this.router.navigate(['/usuario/mantenimiento']);
    }
  
    public errorHandling = (control: string, error: string) => {
      return (
        this.crearAdminForm.controls[control].hasError(error) &&
        this.crearAdminForm.controls[control].invalid &&
        (this.makeSubmit || this.crearAdminForm.controls[control].touched)
      );
    };
  
    /*Modificar*/
    submit(): void {
      this.makeSubmit = true;
      var idR;
  
      if (this.provincias != null) {
        this.provincias.forEach((element) => {
          if (element.id == this.crearAdminForm.get('provincia').value) {
            this.crearAdminForm.patchValue({ provinciaValue: element.value });
          }
        });
      }
      if (this.cantones != null) {
        this.cantones.forEach((element) => {
          if (element.id == this.crearAdminForm.get('canton').value) {
            this.crearAdminForm.patchValue({ cantonValue: element.value });
          }
        });
      }
  
      if (this.distritos != null) {
        this.distritos.forEach((element) => {
          if (element.id == this.crearAdminForm.get('distrito').value) {
            this.crearAdminForm.patchValue({ distritoValue: element.value });
          }
        });
      }
  
      if (this.rolList != null) {
        this.rolList.forEach((element) => {
          if (element.idRol == this.crearAdminForm.get('rol').value) {
            this.crearAdminForm.patchValue({ rolValue: element.nombre });
            idR = element.idRol;
          }
        });
      }
  
      //Validación
      if (this.crearAdminForm.invalid) {
        return;
      }
  
      console.log(this.crearAdminForm.value);
   
      this.gService
        .update('usuario', this.crearAdminForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.crearAdminForm = data;
          this.noti.mensajeRedirect(
            'Éxito!',
            `Usuario actualizado`,
            TipoMessage.success,
            '/'
          );
          this.router.navigate(['/']);
        });
    
    }
  }