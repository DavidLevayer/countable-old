import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { AccountComponent }   from './account/account.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    { component: DashboardComponent, path: 'dashboard' },
    { component: AccountComponent, path: 'account' },
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
