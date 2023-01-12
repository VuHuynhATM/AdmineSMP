import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/main/home/home.component';
import { LoginComponent } from './layout/main/login/login.component';
import { LogoutComponent } from './layout/main/logout/logout.component';
import { SearchsupComponent } from './layout/main/supplier/searchsup/searchsup.component';
import { InfopageComponent } from './layout/main/system/infopage/infopage.component';
import { ProfileComponent } from './layout/main/user/profile/profile.component';
import { SearchComponent } from './layout/main/user/search/search.component';
import { UserdetailComponent } from './layout/main/user/userdetail/userdetail.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: InfopageComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'yourprofile',
    component: ProfileComponent
  },
  {
    path: 'searchuser',
    component: SearchComponent
  },
  {
    path: 'userdetail/:id',
    component: UserdetailComponent
  },
  {
    path: 'systeminfo',
    component: InfopageComponent
  },
  {
    path: 'searchsupplier',
    component: SearchsupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
