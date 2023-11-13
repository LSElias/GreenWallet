import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, from, takeUntil } from 'rxjs';
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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  matList: any;
  user: any;
  centroInfo: any;
  respCentro: any;
  submitted = false;
  centroForm: FormGroup;
  idCentro: number = 0;
  isCreate: boolean = true;
  provincias: Provincia[];
  cantones: any;
  numRegex = '^[0-9]*$';
  provin: any;
  canto: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
    this.listaMateriales();
    this.listaProvincias();
    this.listaCantones();
    this.getAdminsitrador();
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

          if(value==this.centroForm.get('provinciaValue').value){
            this.centroForm.get('provincia').setValue(key);
          }
        }
        this.getCantones(this.centroForm.get('provincia').value);
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
            if(value==this.centroForm.get('cantonValue').value){
              this.centroForm.get('canton').setValue(key);
              console.log(this.centroForm.get('canton').value)
            }
          }
        } else {
          console.log('error — cantones');
        }
      };
    }
  }

  getAdminsitrador() {
    if(!this.isCreate){
      this.user = this.centroForm.get('administrador').value
      console.log( this.centroForm.get('administrador').value)
      console.log(this.user,);
    }else{
    this.user = null;
    this.gService
      .get('usuario/IdU', 4)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.user = data;
      });
    }
  }




  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idCentro = params['id'];
      if (this.idCentro != undefined && !isNaN(Number(this.idCentro))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService
          .get('centro', this.idCentro)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.centroInfo = data;
            this.centroForm.setValue({
              id: null,
              idCentro: this.idCentro,
              idHorario: this.centroInfo.idHorario,
              idDireccion: this.centroInfo.idDireccion,
              administrador: this.centroInfo.administrador,
              nombre: this.centroInfo.nombre,
              telefono: this.centroInfo.telefono,
              horas: this.centroInfo.horas,
              provincia: 0,
              provinciaValue: this.centroInfo.provincia,
              canton: 0,
              cantonValue: this.centroInfo.canton,
              dias: this.centroInfo.dias,
              senas: this.centroInfo.senas,
              materiales: this.centroInfo.materiales.map(
                ({ idMaterial }) => idMaterial
              ),
            });
          this.setProvincias();
          this.getAdminsitrador();
          });
      }
    });
  }

  formularioReactive() {
    this.centroForm = this.fb.group({
      id: [null,null],
      provinciaValue: [null,null],
      cantonValue: [null,null],
      idHorario: [null,null],
      idDireccion: [null,null],
      idCentro: [null,null],
      administrador: [null,null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      telefono: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numRegex),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      ],
      provincia: [null, Validators.required],
      canton: [null, Validators.required],
      senas: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      horas: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      dias: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      materiales: [null, Validators.required],
    });
  }

  listaMateriales() {
    this.matList = null;
    this.gService
      .list('material')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.matList = data;
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

  public errorHandling = (control: string, error: string) => {
    return this.centroForm.controls[control].hasError(error);
  };

  submit(): void {


    this.submitted = true;
    this.provincias.forEach(element => {
      if(element.id == this.centroForm.get('provincia').value){
        this.centroForm.patchValue({provinciaValue: element.value})
      }
    });

    this.cantones.forEach(element => {
      if(element.id == this.centroForm.get('canton').value){
        this.centroForm.patchValue({cantonValue: element.value})
      }
    });


    if (this.centroForm.invalid) return;

    let mFormat: any= this.centroForm.get('materiales').value
    .map((x: any) => ( { ['idMaterial']: x }) )
    this.centroForm.patchValue({materiales: mFormat})

    if (this.isCreate) {

      this.centroForm.patchValue({administrador: this.user});

      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('centro', this.centroForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respCentro = data;
          this.noti.mensajeRedirect(
            'Éxito!',
            `Centro creado: ${data.nombre}`,
            TipoMessage.success,
            '/centros/mantenimiento'
          );
          this.router.navigate(['/centros/mantenimiento']);

        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('centro', this.centroForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respCentro = data;
          this.noti.mensajeRedirect(
            'Éxito!',
            `Centro actualizado: ${data.nombre}`,
            TipoMessage.success,
            '/centros/mantenimiento'
          );
          this.router.navigate(['/centros/mantenimiento']);
        });
    }
  }

  onReset() {
    this.submitted = false;
    this.centroForm.reset();
  }

  onBack() {
    this.router.navigate(['/materiales/mantenimiento']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
