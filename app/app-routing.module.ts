import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { AccountComponent }   from './account/account.component';
import {CategoryComponent} from './category/category.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    { component: DashboardComponent, path: 'dashboard' },
    { component: AccountComponent, path: 'account' },
    { component: CategoryComponent, path: 'category' }
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
