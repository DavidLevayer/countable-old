import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';

@NgModule({
    imports:      [ BrowserModule, AppRoutingModule, HttpModule ],
    declarations: [ AppComponent, DashboardComponent, AccountComponent ],
    providers: [],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }