import { Routes, RouterModule } from '@angular/router';

import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AuthenticationComponent } from './auth/authentication.component';

const APP_ROUTES: Routes = [
 {path: '', redirectTo: '/view', pathMatch: 'full'},
 {path: 'view', component: ViewTaskComponent},
 {path: 'add', component: AddTaskComponent},
 {path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
