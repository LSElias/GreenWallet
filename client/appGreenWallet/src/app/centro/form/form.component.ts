import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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

          });
      }
    });
  }

  formularioReactive() {
    this.centroForm = this.fb.group({
      id: [null,null],
      provinciaValue: [null,null],
      cantonValue: [null,null],
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

  getAdminsitrador() {
    this.user = null;
    this.gService
      .get('usuario/IdU', 4)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);

        this.user = data;
      });
  }

  listaMateriales() {
    this.matList = null;
    this.gService
      .list('material')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);

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

  submitMaterial(): void {
    console.log(this.centroForm.value);

    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.centroForm.invalid) return;
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}


    console.log(this.centroForm.value);
    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('centro', this.centroForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respCentro = data;
        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('material', this.centroForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respCentro = data;
          this.noti.mensajeRedirect(
            'Actualizar Material',
            `Material actualizado: ${data.nombre}`,
            TipoMessage.success,
            '/centro/mantenimiento'
          );
          this.router.navigate(['/centro/mantenimiento']);
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
