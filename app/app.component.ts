import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router";

import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountComponent} from './account/account.component';
import {TransactionComponent} from './transaction/transaction.component';
import {OptionComponent} from './option/option.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@Routes([
    {path: '/dashboard', component: DashboardComponent},
    {path: '/account', component: AccountComponent},
    {path: '/transaction', component: TransactionComponent},
    {path: '/option', component: OptionComponent}
])

export class AppComponent {

    constructor(public router: Router){ }

    isActiveRoute(route: string) {
        return this.router.serializeUrl(this.router.urlTree) == this.router.serializeUrl((this.router.createUrlTree([route])));
    }
}