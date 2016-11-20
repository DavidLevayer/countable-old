import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountComponent} from './account/account.component';
import {FormsModule} from '@angular/forms';
import {MdlModule} from 'angular2-mdl';
import {CategoryComponent} from './category/category.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        DashboardComponent,
        AccountComponent,
        CategoryComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        MdlModule
    ],
    entryComponents: [],
    providers: [],
})
export class AppModule {
}
