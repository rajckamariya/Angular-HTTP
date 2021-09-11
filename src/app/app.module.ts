import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthIntercepterService } from './auth-intercepter.service';
import { LoggingInterceptService } from './logging-intercept.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthIntercepterService,multi:true},{provide:HTTP_INTERCEPTORS,useClass:LoggingInterceptService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
