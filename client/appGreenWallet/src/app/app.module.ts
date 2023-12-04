import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CentroModule } from './centro/centro.module';
import { MaterialesModule } from './materiales/materiales.module';
import { CanjeoModule } from './canjeo/canjeo.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { RecompensaModule } from './recompensa/recompensa.module';
import { BilleteraModule } from './billetera/billetera.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,

    HomeModule,
    RecompensaModule,
    BilleteraModule,
    UsuarioModule,
    CentroModule,
    MaterialesModule,
    CanjeoModule,

    AppRoutingModule,
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
     useClass: HttpErrorInterceptorService, multi: true
    }],    
  bootstrap: [AppComponent]
})
export class AppModule {}
