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

    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }

}
