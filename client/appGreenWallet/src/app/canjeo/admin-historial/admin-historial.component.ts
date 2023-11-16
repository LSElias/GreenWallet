import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-admin-historial',
  templateUrl: './admin-historial.component.html',
  styleUrls: ['./admin-historial.component.css']
})
export class AdminHistorialComponent {
  datos: any;
  destroy$: Subject<boolean>=new Subject<boolean>();


  @ViewChild
  (MatPaginator) paginator!: MatPaginator;
  @ViewChild
  (MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fecha', 'cedula','usuario', 'contacto', 'accion'];


  constructor(private gService: GenericService ){

  }

  ngAfterViewInit(): void {
    this.getInfo();   
    this.dataSource.sort = this.sort;
  }


    getInfo(){
      var id= 3
      this.gService.get('canjeo/admin', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos=response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }

    redirect(id:any){
      if(!Number.isNaN(id)){
        document.location.href = `/canjeo/detalle/${id}`
      }  
    }


    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }

}
