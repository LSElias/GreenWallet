import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-centro-detalle',
  templateUrl: './centro-detalle.component.html',
  styleUrls: ['./centro-detalle.component.css']
})
export class CentroDetalleComponent {
  datos: any;
  destroy$: Subject<boolean>=new Subject<boolean>();
  
  constructor(private gService: GenericService,
    private dialog:MatDialog, private route:ActivatedRoute){
      let id= this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerInfo(Number(id));
      }
    }

    obtenerInfo(id: any){
      this.gService.get('centro/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
    }

    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }

}
