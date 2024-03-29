import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import("./pages/signup/signup.module").then((m) => m.SignupModule),
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./pages/activity/activity.module').then((m) => m.ActivityModule),
  },
  {
    path: 'v/:id',
    loadChildren: () =>
      import('./pages/view-activity/view-activity.module').then((m) => m.ViewActivityModule),
  },
  {
    path: 's',
    loadChildren: () => import("./modules/student/student.module").then((m) => m.StudentModule),
  },
  {
    path: 'a',
    loadChildren: () => import("./modules/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
