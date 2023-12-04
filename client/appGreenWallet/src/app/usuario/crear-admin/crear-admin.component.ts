import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';

interface Provincia {
  id: string;
  value: string;
}

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.component.html',
  styleUrls: ['./crear-admin.component.css']
})
export class CrearAdminComponent {
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
      provinciaValue: [null,null],
      cantonValue: [null,null],
      distritoValue: [null,null],      
      nombre: ['',  Validators.compose([Validators.required, Validators.minLength(3)]),],
      apellido1: ['',  Validators.compose([Validators.required, Validators.minLength(3)]),],
      apellido2: ['',  Validators.compose([Validators.required, Validators.minLength(3)]),],
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

  /*Modificar*/
  ngOnInit(): void {

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
        if(element.id == this.crearAdminForm.get('provincia').value){
          this.crearAdminForm.patchValue({provinciaValue: element.value})
          this.provinciaId = element.id; 
        }
      });
    }
      if (this.cantones != null) {
        this.cantones.forEach(element => {
          if(element.id == this.crearAdminForm.get('canton').value){
            this.crearAdminForm.patchValue({cantonValue: element.value})
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

  listaRoles(){
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

          if(value==this.crearAdminForm.get('provinciaValue').value){
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
            if(value==this.crearAdminForm.get('cantonValue').value){
              this.crearAdminForm.get('canton').setValue(key);
              console.log(this.crearAdminForm.get('canton').value)
            }
          }
        } else {
          console.log('error — cantones');
        }
      };
    }
  }
  
  onReset() {
    this.crearAdminForm.reset();
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
  submit(): void  { 
    this.makeSubmit = true;

    if(this.provincias!=null){
    this.provincias.forEach(element => {
      if(element.id == this.crearAdminForm.get('provincia').value){
        this.crearAdminForm.patchValue({provinciaValue: element.value})
      }
    });
  }
    if (this.cantones != null) {
      this.cantones.forEach(element => {
        if(element.id == this.crearAdminForm.get('canton').value){
          this.crearAdminForm.patchValue({cantonValue: element.value})

        }
      });
    }

    if (this.distritos != null) {
      this.distritos.forEach(element => {
        if(element.id == this.crearAdminForm.get('distrito').value){
          this.crearAdminForm.patchValue({distritoValue: element.value})
        }
      });
    }

    if (this.rolList != null) {
      this.rolList.forEach(element => {
        if(element.idRol == this.crearAdminForm.get('rol').value){
          this.crearAdminForm.patchValue({rolValue: element.nombre})
        }
      });
    }

    //Validación
    if (this.crearAdminForm.invalid) {
      return;
    }

    console.log(this.crearAdminForm.value)

    //Registrar usuario
    this.authService
      .createUser(this.crearAdminForm.value)
      .subscribe((respuesta: any) => {
        this.crearAdminForm = respuesta;
        this.noti.mensajeRedirect(
          'Usuario',
          'Usuario creado ',
          TipoMessage.success,
          '/'
        );
      this.router.navigate(['/usuario/mantenimiento']);
      });
  }

}
