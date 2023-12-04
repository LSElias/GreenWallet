import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

interface Provincia {
  id: string;
  value: string;
}

@Component({
  selector: 'app-centro-index',
  templateUrl: './centro-index.component.html',
  styleUrls: ['./centro-index.component.css'],
})
export class CentroIndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  filterDatos: any;
  matList: any;
  provincias: Provincia[];

  constructor(private gService: GenericService, private dialog: MatDialog) {
    this.listarCentros();
    this.listaProvincias();
    this.listaMateriales();

  }

  listaMateriales() {
    this.matList = null;
    this.gService
      .list('material')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.matList = [{ nombre: 'Vaciar elección', idMaterial: 0 }, ...data];
      });
  }

  listarCentros() {
    this.gService
      .list('centro')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.filterDatos = this.datos;
      });
  }

  redirect() {
    var id = document.getElementsByClassName('botoncito')[0].id;
    if (!Number.isNaN(id)) {
      document.location.href = `/centros/${id}`;
    }
  }

  listaProvincias() {
    let prov: Provincia[] = [];
    let jsonresponse: any;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://ubicaciones.paginasweb.cr/provincias.json');
    request.send();
    request.onload = () => {
      if (request.status == 200) {
        jsonresponse = JSON.parse(request.response);
        prov.push({ id: '0', value: 'Seleccione una provincia' });
        for (var key in jsonresponse) {
          var value = jsonresponse[key];
          prov.push({ id: key, value: value });
        }
        this.provincias = prov;
      } else {
        console.log('error — provs');
      }
    };
  }

  filterName(text: string) {
    if (!text) {
      this.filterDatos = this.datos;
    } else {
      this.filterDatos = this.datos.filter((centro) =>
        centro?.nombre.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  filterProv(text: any) {
    if (!text || text == 'Seleccione una provincia') {
      this.filterDatos = this.datos;
    } else {
      this.filterDatos = this.datos.filter((centro) =>
        centro?.provincia.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  filterMat(text: any) {
    if (!text || text === 0) {
      this.filterDatos = this.datos;
    } else {

      this.filterDatos = this.datos.filter((centro) =>
      centro?.materiales.some((material) => material.idMaterial === text)
    );
    }
  }



  changeData(item: any) {
    let title = <HTMLElement>document.getElementById('title');
    let admin = <HTMLElement>document.getElementById('admin');
    let tel = <HTMLElement>document.getElementById('tel');
    let sede = <HTMLElement>document.getElementById('sede');
    let btn = document.getElementsByClassName('botoncito');

    title.innerHTML = item.nombre;
    admin.innerHTML = ' ' + item.administrador;
    tel.innerHTML = ' ' + item.telefono;
    sede.innerHTML = ' ' + item.sede;
    btn[0].id = item.idCentro;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
