import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountComponent} from './account/account.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {Ng2MaterialModule} from 'ng2-material';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, DashboardComponent, AccountComponent],
    imports: [BrowserModule, AppRoutingModule, HttpModule, FormsModule, Ng2MaterialModule.forRoot()],
    exports: [Ng2MaterialModule],
    entryComponents: [],
    providers: []
})
export class AppModule {
}
