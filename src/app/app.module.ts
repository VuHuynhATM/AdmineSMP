import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import {ImageModule} from 'primeng/image';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ToolbarModule} from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {AvatarModule} from 'primeng/avatar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';
import {RatingModule} from 'primeng/rating';
import {SidebarModule} from 'primeng/sidebar';
import {DataViewModule} from 'primeng/dataview';
import {GalleriaModule} from 'primeng/galleria';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {OrderListModule} from 'primeng/orderlist';
import {ListboxModule} from 'primeng/listbox';
import {PickListModule} from 'primeng/picklist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HomeComponent } from './layout/main/home/home.component';
import { LoginComponent } from './layout/main/login/login.component';
import { LogoutComponent } from './layout/main/logout/logout.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { ProfileComponent } from './layout/main/user/profile/profile.component';
import { SearchComponent } from './layout/main/user/search/search.component';
import { UserdetailComponent } from './layout/main/user/userdetail/userdetail.component';
import { InfopageComponent } from './layout/main/system/infopage/infopage.component';
import { SearchsupComponent } from './layout/main/supplier/searchsup/searchsup.component';
import { LoadingComponent } from './layout/loading/loading.component';
import { SuppdetailComponent } from './layout/main/supplier/suppdetail/suppdetail.component';
import { ItemsearchComponent } from './layout/main/item/itemsearch/itemsearch.component';
import { ItemdetailComponent } from './layout/main/item/itemdetail/itemdetail.component';
import { SearchorderComponent } from './layout/main/order/searchorder/searchorder.component';
import { FeedbackComponent } from './layout/main/order/feedback/feedback.component';
import { CategoryComponent } from './layout/main/item/category/category.component';
import { BrandComponent } from './layout/main/item/brand/brand.component';
import { SpecificationComponent } from './layout/main/item/specification/specification.component';
import { SupwithdrawalComponent } from './layout/main/supwithdrawal/supwithdrawal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    SearchComponent,
    UserdetailComponent,
    InfopageComponent,
    SearchsupComponent,
    LoadingComponent,
    SuppdetailComponent,
    ItemsearchComponent,
    ItemdetailComponent,
    SearchorderComponent,
    FeedbackComponent,
    CategoryComponent,
    BrandComponent,
    SpecificationComponent,
    SupwithdrawalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    MenubarModule,
    BrowserAnimationsModule,
    InputTextModule,
    PanelMenuModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    HttpClientModule,
    OverlayPanelModule,
    TableModule,
    ImageModule,
    DropdownModule,
    CalendarModule,
    ToolbarModule,
    InputNumberModule,
    DialogModule,
    FileUploadModule,
    CardModule,
    ChartModule,
    AvatarModule,
    ProgressSpinnerModule,
    ChipModule,
    RatingModule,
    SidebarModule,
    DataViewModule,
    GalleriaModule,
    ToggleButtonModule,
    OrderListModule,
    ListboxModule,
    PickListModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
