import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/main/home/home.component';
import { BrandComponent } from './layout/main/item/brand/brand.component';
import { CategoryComponent } from './layout/main/item/category/category.component';
import { ItemdetailComponent } from './layout/main/item/itemdetail/itemdetail.component';
import { ItemsearchComponent } from './layout/main/item/itemsearch/itemsearch.component';
import { SpecificationComponent } from './layout/main/item/specification/specification.component';
import { LoginComponent } from './layout/main/login/login.component';
import { LogoutComponent } from './layout/main/logout/logout.component';
import { FeedbackComponent } from './layout/main/order/feedback/feedback.component';
import { SearchorderComponent } from './layout/main/order/searchorder/searchorder.component';
import { SearchsupComponent } from './layout/main/supplier/searchsup/searchsup.component';
import { SuppdetailComponent } from './layout/main/supplier/suppdetail/suppdetail.component';
import { TransactionComponent } from './layout/main/supplier/transaction/transaction.component';
import { SupwithdrawalComponent } from './layout/main/supwithdrawal/supwithdrawal.component';
import { InfopageComponent } from './layout/main/system/infopage/infopage.component';
import { SystransactionComponent } from './layout/main/system/systransaction/systransaction.component';
import { SyswithdrawalComponent } from './layout/main/system/syswithdrawal/syswithdrawal.component';
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
  {
    path: 'supplierdetail/:id',
    component: SuppdetailComponent
  },
  {
    path: 'searchitem/:id',
    component: ItemsearchComponent
  },
  {
    path: 'itemdetail/:id',
    component: ItemdetailComponent
  },
  {
    path: 'order',
    component: SearchorderComponent
  },
  {
    path: 'feedbackdetail/:id',
    component: FeedbackComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'brand',
    component: BrandComponent
  },
  {
    path: 'specification',
    component: SpecificationComponent
  },
  {
    path: 'supplierwithdrawal',
    component: SupwithdrawalComponent
  },
  {
    path: 'suptransaction/:id',
    component: TransactionComponent
  },
  {
    path: 'systransaction',
    component: SystransactionComponent
  },
  {
    path: 'syswithdrawal',
    component: SyswithdrawalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
