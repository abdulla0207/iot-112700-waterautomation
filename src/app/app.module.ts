import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp} from '@angular/fire/app'
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { NgxGaugeModule } from 'ngx-gauge';
import { GaugeComponent } from './gauge/gauge.component';
import { FormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    AppComponent,
    GaugeComponent
  ],
  imports: [
    BrowserModule,
    NgxGaugeModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(()=>getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
