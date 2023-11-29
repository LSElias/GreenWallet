import { formatDate, getLocaleDateFormat } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil, window } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';

export class ItemCart {
  idItem: any;
  product: any;
  cantidad: any;
  valor: any;
  subtotal: any;
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements AfterViewInit {
  private cart = new BehaviorSubject<ItemCart[]>(null);
  public currentDataCart$ = this.cart.asObservable();
  public qtyItems = new Subject<number>();

  myControl = new FormControl('');
  options: any;
  optionHolder: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  cliente: any;
  centro: any;
  admin: any;
  fecha = Date.now();
  total: any = 0;
  cantidad: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['material', 'precio', 'cantidad', 'subtotal'];

  date: any = formatDate(new Date(), 'dd-MM-YYYY', 'en');

  constructor(
    private route: Router,
    private genericService: GenericService,
    private noti: NotificacionService
  ) {
    this.myControl = new FormControl();
    this.myControl.valueChanges.subscribe((newValue) => {
      this.options = this.filterValues(newValue);
    });
    this.cart = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('orden'))
    );
    this.currentDataCart$ = this.cart.asObservable();
  }

  ngAfterViewInit(): void {
    this.getUserData();
    this.getAdminData();
    this.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.getTotal();
  }

  actualizarCantidad(item: any) {
      this.cantidad = item.cantidad
      //console.log('Valor Cantidad: ', this.cantidad)

      if (!isNaN(this.cantidad)) {
        this.addToCart(item);
        this.total = this.getTotal();
      }
      if (this.cantidad === null) {
        this.noti.mensaje(
          'Error',
          'Solo acepta números',
          TipoMessage.error
        );
        }         
  }

  // CARRITO
  saveCart(): void {
    localStorage.setItem('orden', JSON.stringify(this.cart.getValue()));
  }

  addToCart(producto: any) {
    const newItem = new ItemCart();
    newItem.idItem = producto.idMaterial | producto.idItem;
    newItem.valor = producto.valor;
    newItem.cantidad = 0;
    newItem.subtotal = this.calculoSubtotal(newItem);
    newItem.product = producto;
    let listCart = this.cart.getValue();

    if (listCart) {
      let objIndex = listCart.findIndex((obj) => obj.idItem == newItem.idItem);
      if (objIndex != -1) {
        if (producto.hasOwnProperty('cantidad')) {
          if (producto.cantidad <= -1) {
            this.removeFromCart(newItem);
            return;
          } else {
            listCart[objIndex].cantidad = producto.cantidad;
          }
        } else {
          listCart[objIndex].cantidad += 1;
        }
        newItem.cantidad = listCart[objIndex].cantidad;
        listCart[objIndex].subtotal = this.calculoSubtotal(newItem);
      } else {
        listCart.push(newItem);
      }
    } else {
      listCart = [];
      listCart.push(newItem);
    }
    this.cart.next(listCart); //Enviamos el valor al Observable
    this.qtyItems.next(this.quantityItems());
    this.saveCart();
  }

  private calculoSubtotal(item: ItemCart) {
    return item.valor * item.cantidad;
  }

  public removeFromCart(newData: ItemCart) {
    let listCart = this.cart.getValue();
    let objIndex = listCart.findIndex((obj) => obj.idItem == newData.idItem);
    if (objIndex != -1) {
      listCart.splice(objIndex, 1);
    }
    this.cart.next(listCart);
    this.qtyItems.next(this.quantityItems());
    this.saveCart();
  }

  get getItems() {
    return this.cart.getValue();
  }

  get countItems(): Observable<number> {
    this.qtyItems.next(this.quantityItems());
    return this.qtyItems.asObservable();
  }

  quantityItems() {
    let listCart = this.cart.getValue();
    let sum = 0;
    if (listCart != null) {
      listCart.forEach((obj) => {
        sum += obj.cantidad;
      });
    }
    return sum;
  }

  public getTotal(): number {
    let total = 0;
    let listCart = this.cart.getValue();
    if (listCart != null) {
      listCart.forEach((item: ItemCart, index) => {
        total += item.subtotal;
      });
    }
    return total;
  }

  @HostListener('window:beforeunload', ['$event'])
  public deleteCart() {
    this.cart.next(null);
    this.qtyItems.next(0);
    this.saveCart();
  }

  //CARRITO END

  filterValues(search: any) {
    if (search) {
      return this.options.filter(
        (value) =>
          value?.cedula.toLowerCase().indexOf(search.toLowerCase()) === 0
      );
    } else {
      return this.optionHolder;
    }
  }

  infoCliente(value: any) {
    this.optionHolder.forEach((element) => {
      if (element.cedula == value) {
        var idObject = document.getElementById('infoCliente');
        idObject.innerHTML = ` <p><b> Cédula:</b> ${element.cedula}  </p>
        <p><b> Cliente:</b> ${element.nombre}  </p> 
        <p><b> Contacto:</b> ${element.correo}  </p> `;
        this.cliente = element;
      }
    });
  }

  limpiarUsuario() {
    var idObject = document.getElementById('infoCliente');
    idObject.innerHTML = `<p><b> Cédula:</b></p> 
      <p><b> Cliente:</b></p>
      <p><b> Contacto:</b></p>`;
    this.cliente = null;

    this.myControl.reset(); 
  }

  getUserData() {
    this.genericService
      .get('usuario/IdR', 3)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.options = response;
        this.optionHolder = response;
      });
  }

  getAdminData() {
    this.genericService
      .get('usuario/IdU', 4)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.admin = response;
        this.getCentroData();
      });
  }

  getCentroData() {
    this.genericService
      .get('centro/admin', this.admin.idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.centro = response;
        console.log(this.centro);
        if (
          JSON.parse(localStorage.getItem('orden')) == null ||
          JSON.parse(localStorage.getItem('orden')) == '[]'
        ) {
          this.centro[0].materiales.forEach((element) => {
            console.log(element);
            this.addToCart(element);
          });
        }
      });
  }

  sendData() {
    console.log(this.centro);
    if (this.cliente == null) {
      this.noti.mensaje(
        'Canjeo',
        'Debe seleccionar un cliente.',
        TipoMessage.warning
      );
      return;
    }
    if (this.getItems != null) {
      //Obtener los items de la compra
      let itemsCompra = this.getItems;
      //Estructura para insertar en la tabla intermedia
      //[{'videojuego_id': valor, 'cantidad': valor}]
      var count = 0;
      itemsCompra.filter(function (x) {
        if (x.cantidad == 0) {
          itemsCompra.splice(count, 1);
        }
        count++;
      });

      let detalle = itemsCompra.map((x) => ({
        ['idMaterial']: x.idItem,
        ['cantidad']: x.cantidad,
        ['subtotal']: x.subtotal,
      }));
      //Datos a insertar en el API
      let datosInsert = {
        fecha: this.fecha,
        idUsuario: this.cliente.idUsuario,
        idCentro: this.centro[0].idCentro,
        total: this.getTotal(),
        canjeoDet: detalle,
      };
      console.log(datosInsert);
      //Llamar al API para crear una orden
      this.genericService
        .create('canjeo/', datosInsert)
        .subscribe((response: any) => {
          //Notificar el registro
          this.deleteCart();
          this.total = this.getTotal();
          this.noti.mensajeRedirect(
            'Canjeo',
            `Canjeo registrado #${response.idCanjeo}`,
            TipoMessage.success, `/canjeo/detalle/${response.idCanjeo}`
          );
          this.route.navigate([`/canjeo/detalle/${response.idCanjeo}`]);
          
        });
    } else {
      this.noti.mensaje(
        'Canjeo',
        'Agregue materiales al canjeo',
        TipoMessage.warning
      );
    }
  }
}
