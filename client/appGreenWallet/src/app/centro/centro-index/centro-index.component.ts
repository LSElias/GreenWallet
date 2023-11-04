import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-centro-index',
  templateUrl: './centro-index.component.html',
  styleUrls: ['./centro-index.component.css']
})
export class CentroIndexComponent {
  datos: any;
  destroy$: Subject<boolean>=new Subject<boolean>();

  constructor(private gService: GenericService,
    private dialog:MatDialog, ){
        this.listarCentros();
    }

    listarCentros(){
      this.gService.list('centro')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
    }

    redirect(){
      var id = document.getElementsByClassName("botoncito")[0].id
      if(!Number.isNaN(id)){
        document.location.href = `/centros/${id}`
      }  
    }

    changeData(item: any){
      let title = <HTMLElement>document.getElementById("title");
      let admin = <HTMLElement>document.getElementById("admin");
      let tel = <HTMLElement>document.getElementById("tel");
      let sede = <HTMLElement>document.getElementById("sede");
      let btn = document.getElementsByClassName("botoncito");

      title.innerHTML= item.nombre;
      admin.innerHTML= " " + item.administrador;
      tel.innerHTML= " " + item.telefono;
      sede.innerHTML= " " + item.sede;
      btn[0].id= item.idCentro
    }

    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }



}
