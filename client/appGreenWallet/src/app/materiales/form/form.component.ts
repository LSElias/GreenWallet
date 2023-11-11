import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  unidadList: any;
  catList: any;
  materialInfo: any;
  respmaterial: any;
  submitted = false;
  materialForm: FormGroup;
  idMaterial: number = 0;
  isCreate: boolean = true;
  numRegex = '^[0-9]*$';
  file:any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
    this.listaUnidades();
    this.listaCategoria();
  }
  ngOnInit(): void {
    let img = document.getElementById("output") as HTMLImageElement;
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idMaterial=params['id'];
      if(this.idMaterial != undefined && !isNaN(Number(this.idMaterial))){
        this.isCreate=false;
        this.titleForm='Actualizar';
        this.gService
          .get('material', this.idMaterial)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any)=>{
            this.materialInfo=data;
            console.log(this.materialInfo)
            //Precargar los datos en el formulario
            this.materialForm.setValue({
              id: this.materialInfo.idMaterial,
              nombre: this.materialInfo.nombre,
              descripcion: this.materialInfo.descripcion,
              valorUnidad: this.materialInfo.valorUnidad,
              categoria: this.materialInfo.categoria.idCategoriaM,
              imagen: null,
              color: this.materialInfo.color,
              unidadMedida: this.materialInfo.unidadMedida.idUnidad,
            })
            img.src = `../../../assets/images/${this.materialInfo.imagen}`
          })
        
      }
    })
  }

  showTag(value:any){
    let span = document.getElementById("colortag")
    span.innerHTML= '';
    span.innerHTML= "<b> " +  value + " </b>";
  }


  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.materialForm=this.fb.group({
      id: [null, null],
      nombre:[
        null,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      descripcion:[null, Validators.compose([Validators.required, Validators.minLength(3)])],
      valorUnidad:[null, 
        Validators.compose([Validators.required,
          Validators.pattern(this.numRegex)])
      ],
      unidadMedida:[null, Validators.required],
      categoria:[null, Validators.required],
      color:[null, Validators.required],
      imagen:[null,Validators.required]
    })
  }

  listaUnidades() {
    this.unidadList = null;
    this.gService
      .list('datos/unidadMed')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.unidadList = data;
      });
  }

  listaCategoria() {
    this.catList = null;
    this.gService
      .list('datos/catmat')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.catList = data;
      });
  }

  getfile(event:any){
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.materialForm.controls[control].hasError(error);
  };
  submitMaterial(): void {
    console.log(this.materialForm.value)
    var sentform: any = new FormData();

    
    //Establecer submit verdadero
    if(this.isCreate || this.materialForm.value.imagen != null){
      sentform.append('imagen', this.file, this.file.name);
    }else{
      this.materialForm.get('imagen').clearValidators();
      this.materialForm.get('imagen').updateValueAndValidity();
    }
    this.submitted=true;
    //Verificar validación
    if(this.materialForm.invalid) return;
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}

      sentform.append('id', this.materialForm.value.id);
      sentform.append('nombre', this.materialForm.value.nombre);
      sentform.append('descripcion', this.materialForm.value.descripcion);
      sentform.append('idUnidad', this.materialForm.value.unidadMedida);
      sentform.append('idCategoria', this.materialForm.value.categoria);
      sentform.append('color', this.materialForm.value.color);
      sentform.append('valor', this.materialForm.value.valorUnidad);

      console.log(sentform);
    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('material',sentform)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          //Obtener respuesta
          this.respmaterial=data;
          console.log(data);
          if(this.respmaterial!="Color ocupado"){
         this.noti.mensajeRedirect('Crear Material',
              `Material creado: ${data.nombre}`,
              TipoMessage.success,
              '/materiales/mantenimiento');
         this.router.navigate(['/materiales/mantenimiento'])
        }else{
          this.noti.mensaje('Error', 'Color en uso. Seleccione uno diferente', TipoMessage.error);
        }
        })
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('material',sentform)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          //Obtener respuesta
          this.respmaterial=data;
          this.noti.mensajeRedirect('Actualizar Material',
              `Material actualizado: ${data.nombre}`,
              TipoMessage.success,
              '/materiales/mantenimiento');
          this.router.navigate(['/materiales/mantenimiento'])
        })
    }
  }
  onReset() {
    this.submitted = false;
    this.materialForm.reset();
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
