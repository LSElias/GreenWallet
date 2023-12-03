import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

export  interface datosRol{
  idRol: number;
  nombre: string; 
}

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  datosR : any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['cedula', 'nombre', 'correo', 'telefono', 'accion'];
  
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngAfterViewInit(): void {
    this.getRol();
    this.getInfo();
    this.dataSource.sort = this.sort;
  }

  getRol() {
    this.gService
      .list('datos/rol')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datosR = response;
        console.log(this.datosR);
      });
  }

  getInfo() {
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  crear() {
    this.router.navigate(['/usuario/crear'], {
      relativeTo: this.route,
    });
  }

  redirectDetalle(id:any){
    this.router.navigate(['/usuario/detalle', id], {
      relativeTo: this.route,
    });
  }

  update(id:any){
    this.router.navigate(['/usuario/actualizar', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
