import { AfterViewInit, Component, ViewChild } from '@angular/core';
import  Chart  from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
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
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements AfterViewInit{
    canvas: any;
    ctx: any;
    cupon: any; 
    canje: any; 
    ecoCupon: any; 


    @ViewChild('ecomonedasCentros') ecomonedasCentros!: { nativeElement: any };
   
    @ViewChild('totalEcomonedas') totalEcomonedas!: { nativeElement : any };

    datos: any;
    totalEc: any; 

    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private gService: GenericService) {
    }

   ngAfterViewInit(): void {
    this.inicioGrafico();
  }

  //Ecomonedas producidas

  inicioGrafico() {
      //Obtener información del API
      this.gService
        .list('centro/ecomonedas')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.datos = data;
          console.log(data);
            this.graficoBrowser(
              this.ecomonedasCentros.nativeElement,
              TypeGraph.BAR)
        });
    
        this.gService
        .list('centro/totalEco')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.totalEc = data;
          console.log(data);
            this.graficoTotalEco(
              this.totalEcomonedas.nativeElement,
              TypeGraph.BAR)
        });

        this.getCupones();
        this.getCanjes();
        this.getEcoCupon(); 
  }

  colorRandom() {
    return Math.floor(Math.random() * 255) + 1;
  }

  updateDataGrafico( chart: Chart){
    chart.data.datasets= [
      {
        label: 'Ecomonedas producidas de los centro en el presente año: ',
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
        data: this.datos.map((x: { total: any }) => {
          return x.total;
        }),
      },
    ]
    chart.update()
  }
  updateConfigGrafico(chart: Chart){
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

 
 graficoBrowser(canvas: any, typeG: TypeGraph): void {
  this.ctx = canvas.getContext('2d');
  //let grafico;
  let grafico=Chart.getChart(canvas);
  //Si existe destruir el Canvas para mostrar el grafico
  if(grafico && grafico!=undefined && grafico!=null){
    this.updateDataGrafico(grafico)
    this.updateConfigGrafico(grafico)
  }else{
    grafico = new Chart(this.ctx, {
      type: typeG,
      data: {
        //Etiquetas debe ser un array
        labels: this.datos.map((x: { nombre: any }) => x.nombre),
        datasets: [
          {
            label: 'Ecomonedas producidas',
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
            data: this.datos.map((x: { total: any }) => {
              return x.total;
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
            text: 'Ecomonedas producidas por  los centros en el presente año',
          },
        },
      }

    });
  }  
  
}

//Total de ecomonedas generadas por cada centro 
graficoTotalEco(canvas: any, typeG: TypeGraph): void {
  this.ctx = canvas.getContext('2d');
  //let grafico;
  let grafico=Chart.getChart(canvas);
  //Si existe destruir el Canvas para mostrar el grafico
  if(grafico && grafico!=undefined && grafico!=null){
    this.updateDataTotalEco(grafico)
    this.updateConfigTotalEco(grafico)
  }else{
    grafico = new Chart(this.ctx, {
      type: typeG,
      data: {
        //Etiquetas debe ser un array
        labels: this.totalEc.map((x: { centro: any }) => x.centro),
        datasets: [
          {
            label: 'Ecomonedas generadas',
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
            data: this.totalEc.map((x: { ecomonedas: any }) => {
              return x.ecomonedas;
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
            text: 'Total de ecomonedas generadas por cada centro',
          },
        },
      }

    });
  }  
  
}
updateDataTotalEco( chart: Chart){
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
      data: this.totalEc.map((x: { ecomonedas: any }) => {
        return x.ecomonedas;
      }),
    },
  ]
  chart.update()
}
updateConfigTotalEco(chart: Chart){
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

/*Cant Total de Canjes de Materiales*/
getCanjes() {
  this.gService
    .list('centro/canjes')
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      console.log(response);
      this.canje = response.totalCanjes;
    });
}

/* Cant Canjes de cupones año actual*/
getCupones() {

  this.gService
    .list('centro/cupones')
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      console.log(response);
      this.cupon = response.cupon;
    });
}

/* Total de ecomo utilizadas en los cupones del año actual*/
getEcoCupon() {

  this.gService
    .list('centro/totalCupon')
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      console.log(response);
      this.ecoCupon = response;
    });
}


















ngOnDestroy() {
  this.destroy$.next(true);
  // Desinscribirse
  this.destroy$.unsubscribe();
}

}
