import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DiagMaterialesComponent } from '../diag-materiales/diag-materiales.component';

const track = null;

@Component({
  selector: 'app-index-materiales',
  templateUrl: './index-materiales.component.html',
  styleUrls: ['./index-materiales.component.css']
})

export class IndexMaterialesComponent implements OnInit{
  datos: any;
  destroy$: Subject<boolean>= new Subject<boolean>();

  constructor(private gService: GenericService, 
    private dialog: MatDialog){
      this.listarMateriales();

      
    }

    
    ngOnInit(){
      import('../../../assets/js/ImageScrollbar.js');
    }
  

    listarMateriales(){
      //Solicitud al API para listar todos los videojuegos
      //localhost:3000/videojuego
      this.gService.list('datos/catmat/')
        .pipe(takeUntil(this.destroy$))
        .subscribe((response:any)=>{
          console.log(response);
          this.datos=response;
        })
    }

    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
}
