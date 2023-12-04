import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-all-admis',
  templateUrl: './all-admis.component.html',
  styleUrls: ['./all-admis.component.css']
})
export class AllAdmisComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();


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
    this.getInfo();
    this.dataSource.sort = this.sort;
  }

  getInfo() {
    var user = 3;
    this.gService
      .get('usuario/idR', 2)
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
