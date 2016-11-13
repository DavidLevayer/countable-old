import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountComponent} from './account/account.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, DashboardComponent, AccountComponent],
    imports: [BrowserModule, AppRoutingModule, HttpModule, MaterialModule.forRoot(), FormsModule],
    entryComponents: [],
    providers: [],
})
export class AppModule {
}
