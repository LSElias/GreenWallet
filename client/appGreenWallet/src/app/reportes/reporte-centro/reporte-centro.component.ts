import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  Chart  from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

enum TypeGraph {
  BAR = 'bar',
  BUBBLE = 'bubble',
  DOUGHNUT = 'doughnut',
  PIE = 'pie',
  LINE = 'line',
  POLARAREA = 'polarArea',
  RADAR = 'radar',
  SCATTER = 'scatter',
}

@Component({
  selector: 'app-reporte-centro',
  templateUrl: './reporte-centro.component.html',
  styleUrls: ['./reporte-centro.component.css']
})
export class ReporteCentroComponent implements OnInit {
  info: any; 
  material: any; 
  ctx: any;
  ecomoneda: any;
  canjes:any; 

  destroy$: Subject<boolean> = new Subject<boolean>();
  breakpoint: number;
  isAutenticated: boolean;
  currentUser: any;

  @ViewChild('canjesMaterial') canjesMaterial!: { nativeElement: any };

  
  constructor(
    private gService: GenericService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit(): void {

    this.authService.decodeToken.subscribe((user: any) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });

    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
    this.getInfo();

/* Cant Canjes por material en año act */ 
    this.gService
    .get('centro/material', this.currentUser.idUsuario)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.material = data;
      console.log(data);
        this.graficoMaterial(
          this.canjesMaterial.nativeElement,
          TypeGraph.BAR)
    });

    this.getEcoCentro();
    this.getCanjesMaterial();

    this.breakpoint = window.innerWidth <= 1080 ? 1 : 3;

  }

  getInfo() {
    this.gService
      .get('centro/info', this.currentUser.idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.info = response[0].nombre;
      });
  }

  colorRandom() {
    return Math.floor(Math.random() * 255) + 1;
  }

  /* Cant Canjes por material en año act */ 
  graficoMaterial(canvas: any, typeG: TypeGraph): void {
    this.ctx = canvas.getContext('2d');
    //let grafico;
    let grafico=Chart.getChart(canvas);
    //Si existe destruir el Canvas para mostrar el grafico
    if(grafico && grafico!=undefined && grafico!=null){
      this.updateDataMaterial(grafico)
      this.updateConfigMaterial(grafico)
    }else{
      grafico = new Chart(this.ctx, {
        type: typeG,
        data: {
          //Etiquetas debe ser un array
          labels: this.material.map((x: { material: any }) => x.material),
          datasets: [
            {
              label: 'Canjeos',
              backgroundColor: [
                `rgba(0, 0, ${this.colorRandom()}, 0.35)`,
                `rgba(60, 179, ${this.colorRandom()}, 0.35)`,
                `rgba(${this.colorRandom()}, 165, 0, 0.35)`,
                `rgba(106, 90, ${this.colorRandom()}, 0.35)`,
                `rgba(${this.colorRandom()}, 130, 238, 0.35)`,
                `rgba(${this.colorRandom()}, 0, 0, 0.35)`,
                `rgba(${this.colorRandom()}, 210, 210, 0.35)`,
              ],
              borderWidth: 1,
              //Datos del grafico, debe ser un array
              data: this.material.map((x: { cantidad_canjes: any }) => {
                return x.cantidad_canjes;
              }),
            },
          ]
        },
        options:{
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Cantidad de canjes agrupados por materiales del año actual',
            },
          },
        }
  
      });
    }  
    
  }
  updateDataMaterial( chart: Chart){
    chart.data.datasets= [
      {
        label: '',
        backgroundColor: [
          `rgba(0, 0, ${this.colorRandom()}, 0.35)`,
          `rgba(60, 179, ${this.colorRandom()}, 0.35)`,
          `rgba(${this.colorRandom()}, 165, 0, 0.35)`,
          `rgba(106, 90, ${this.colorRandom()}, 0.35)`,
          `rgba(${this.colorRandom()}, 130, 238, 0.35)`,
          `rgba(${this.colorRandom()}, 0, 0, 0.35)`,
          `rgba(${this.colorRandom()}, 210, 210, 0.35)`,
        ],
        borderWidth: 1,
        //Datos del grafico, debe ser un array
        data: this.material.map((x: { cantidad_canjes: any }) => {
          return x.cantidad_canjes;
        }),
      },
    ]
    chart.update()
  }
  updateConfigMaterial(chart: Chart){
    chart.options={
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '',
        },
      },
    }
  
    chart.update()
  }

/*Total de ecomonedas generadas por centro  */
getEcoCentro() {

  this.gService
    .get('centro/ecomoneda',this.currentUser.idUsuario)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      console.log(response);
      this.ecomoneda = response[0].ecomonedas;
    });
}

/* Cant Canjes de Materiales en mes actual */ 
getCanjesMaterial() {

  this.gService
    .get('centro/canjes',this.currentUser.idUsuario)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      console.log(response);
      this.canjes = response;
    });
}






}
