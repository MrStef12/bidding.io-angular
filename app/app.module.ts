import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage.component';
import { AuctionComponent } from './auction.component';

import { AppRoutingModule } from './app-routing.module'
import { RestService } from './rest.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FrontpageComponent,
    AuctionComponent
  ],
  providers: [ RestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
