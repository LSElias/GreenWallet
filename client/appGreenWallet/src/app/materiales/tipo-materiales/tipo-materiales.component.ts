import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-tipo-materiales',
  templateUrl: './tipo-materiales.component.html',
  styleUrls: ['./tipo-materiales.component.css']
})
export class TipoMaterialesComponent {
  datos: any;
  destroy$: Subject<boolean>=new Subject<boolean>();

  constructor(private gService: GenericService,
    private dialog:MatDialog, private route:ActivatedRoute){
      
      let id= this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.listarMateriales(Number(id));
      }
    }

    listarMateriales(id:any){
      this.gService.get('material/cat', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
    }

    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }

}
