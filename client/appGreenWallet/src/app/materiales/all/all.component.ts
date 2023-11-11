import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean>=new Subject<boolean>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'categoria','accion'];


  constructor(private gService: GenericService, private router: Router,
    private route: ActivatedRoute  ){

  }

  ngAfterViewInit(): void {
    this.getInfo();   
    this.dataSource.sort = this.sort;
  }


    getInfo(){
      var id= 7
      this.gService.list('material/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos=response;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }

    crear(){
      this.router.navigate(['/materiales/crear'], {
        relativeTo: this.route,
      });
    }

    redirectDetalle(id:any){
      if(!Number.isNaN(id)){
        document.location.href = `/materiales/detalle/${id}`
      }  
    }


    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
}
