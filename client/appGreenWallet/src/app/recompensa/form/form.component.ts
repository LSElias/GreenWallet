import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  catList: any;
  recomInfo: any;
  respmaterial: any;
  submitted = false;
  recomForm: FormGroup;
  idRecompensas: number = 0;
  isCreate: boolean = true;
  numRegex = '^[0-9]*$';
  file: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es-CR');
    this.formularioReactive();
    this.listaCategoria();
  }
  ngOnInit(): void {
    let img = document.getElementById('output') as HTMLImageElement;
    this.activeRouter.params.subscribe((params: Params) => {
      this.idRecompensas = params['id'];
      if (
        this.idRecompensas != undefined &&
        !isNaN(Number(this.idRecompensas))
      ) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService
          .get('recompensa', this.idRecompensas)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.recomInfo = data;
            console.log(this.recomInfo);
            //Precargar los datos en el formulario
            this.recomForm.setValue({
              id: this.idRecompensas,
              nombre: this.recomInfo.nombre,
              descripcion: this.recomInfo.descripcion,
              valorUnidad: this.recomInfo.valorUnidad,
              cantidadDispo: this.recomInfo.cantidadDispo,
              categoria: this.recomInfo.categoria.idCategoria,
              foto: null,
              fechaAdquision: this.recomInfo.fechaAdquision,
              fechaExpiracion: this.recomInfo.fechaExpiracion,
            });
            console.log(this.recomForm.value);
            img.src = `../../../assets/images/${this.recomInfo.foto}`;
          });
      }
    });
  }

  showTag(value: any) {
    let span = document.getElementById('colortag');
    span.innerHTML = '';
    span.innerHTML = '<b> ' + value + ' </b>';
  }

  formularioReactive() {
    this.recomForm = this.fb.group({
      id: [true , null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      descripcion: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      valorUnidad: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numRegex),
        ]),
      ],
      cantidadDispo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numRegex),
        ]),
      ],
      categoria: [null, Validators.required],
      foto: [null, Validators.required],
      fechaAdquision: [null, Validators.required],
      fechaExpiracion: [null, Validators.required],
    });
  }

  listaCategoria() {
    this.catList = null;
    this.gService
      .list('datos/catrec')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.catList = data;
      });
  }

  getfile(event: any) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.recomForm.controls[control].hasError(error);
  };
  submitRecompensa(): void {
    var sentform: any = new FormData();

    if (this.isCreate || this.recomForm.value.foto != null) {
      if (this.file == null || this.file == null) {
        this.noti.mensaje(
          'Imagen',
          'Se necesita una imagen para poder guardar el material.',
          TipoMessage.error
        );
        return;
      }
      sentform.append('foto', this.file, this.file.name);
    } else {
      this.recomForm.get('foto').clearValidators();
      this.recomForm.get('foto').updateValueAndValidity();
    }
    this.submitted = true;
    if (this.recomForm.invalid) return;

    sentform.append('id', this.recomForm.value.id);
    sentform.append('nombre', this.recomForm.value.nombre);
    sentform.append('descripcion', this.recomForm.value.descripcion);
    sentform.append('idCategoria', this.recomForm.value.categoria);
    sentform.append('valor', this.recomForm.value.valorUnidad);
    sentform.append('cantidad', this.recomForm.value.cantidadDispo);
    sentform.append('fechaAdquision', this.recomForm.value.fechaAdquision);
    sentform.append('fechaExpiracion', this.recomForm.value.fechaExpiracion);
    sentform.append('estado', '1');
    console.log(sentform.get('id'))
    console.log(sentform.get('idRecompensas'))


    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('recompensa', sentform)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respmaterial = data;
          this.noti.mensajeRedirect(
            'Crear Recompensa',
            `Recompensa creado: ${data.nombre}`,
            TipoMessage.success,
            '/recompensa/mantenimiento'
          );
          this.router.navigate(['/recompensa/mantenimiento']);
        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('recompensa', sentform)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respmaterial = data;
          this.noti.mensajeRedirect(
            'Actualizar Recompensa',
            `Recompensa actualizado: ${data.nombre}`,
            TipoMessage.success,
            '/recompensa/mantenimiento'
          );
          this.router.navigate(['/recompensa/mantenimiento']);
        });
    }
  }
  onReset() {
    this.submitted = false;
    this.recomForm.reset();
  }
  onBack() {
    this.router.navigate(['/recompensa/mantenimiento']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
