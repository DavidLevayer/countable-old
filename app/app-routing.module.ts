import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { AccountComponent }   from './account/account.component';
import {Ng2MaterialModule} from 'ng2-material';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    { component: DashboardComponent, path: 'dashboard' },
    { component: AccountComponent, path: 'account' },
];

@NgModule({
    exports: [ RouterModule, Ng2MaterialModule ],
    imports: [ RouterModule.forRoot(routes), Ng2MaterialModule.forRoot() ],
})
export class AppRoutingModule {}
