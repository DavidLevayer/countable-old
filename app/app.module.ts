import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }   from './app.component';
import { DashboardComponent }     from './dashboard/dashboard.component';
import { AccountComponent }     from './account/account.component';

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule ],
    declarations: [ AppComponent, DashboardComponent, AccountComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }