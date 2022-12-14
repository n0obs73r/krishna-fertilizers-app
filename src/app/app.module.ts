import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './footer/footer.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SeedsViewComponent } from './seeds-view/seeds-view.component';
import { FertilizersViewComponent } from './fertilizers-view/fertilizers-view.component';
import { MachineryViewComponent } from './machinery-view/machinery-view.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthInterceptor} from "./auth-interceptor";
import { MaterialElevationDirective } from "./material-elevation.directive";
import { ProductManagementComponent } from './product-management/product-management.component'
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthGuard} from "./auth.guard";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CarouselComponent,
    HomepageComponent,
    FooterComponent,
    ProductFormComponent,
    SeedsViewComponent,
    FertilizersViewComponent,
    MachineryViewComponent,
    LoginComponent,
    SignupComponent,
    MaterialElevationDirective,
    ProductManagementComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatCardModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatListModule,
        HttpClientModule,
        ReactiveFormsModule,
        SwiperModule,
        FlexLayoutModule,
        // IvyCarouselModule,
        MatExpansionModule,
        MatPaginatorModule,
        FormsModule,
        RouterModule.forRoot([
            {path: '', component: HomepageComponent},
            {path: 'product-form', component: ProductFormComponent},
            {path: 'seeds-view', component: SeedsViewComponent},
            {path: 'fertilizers-view', component: FertilizersViewComponent},
            {path: 'machinery-view', component: MachineryViewComponent},
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent},
            {path: 'product-management', component: ProductManagementComponent, canActivate: [AuthGuard]},
            {path: 'edit/:productId', component: ProductFormComponent, canActivate: [AuthGuard]}
        ]),
        MatProgressSpinnerModule,
        MatInputModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: AuthGuard}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
