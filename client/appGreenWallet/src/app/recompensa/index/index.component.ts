import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  breakpoint: number;

  constructor(private gService: GenericService) {
    this.listarRec();
  }

  listarRec() {
    //Solicitud al API para listar todos los videojuegos
    //localhost:3000/videojuego
    this.gService
      .list('recompensa')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response;
      });
  }

  Redirect(id: any) {}

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 1080 ? 1 : 3;
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 1080 ? 1 : 3;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
