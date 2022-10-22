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
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
// import {IvyCarouselModule} from 'angular-responsive-carousel';





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
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'product-form', component: ProductFormComponent},
      {path: 'seeds-view', component: SeedsViewComponent},
      {path: 'fertilizers-view', component: FertilizersViewComponent},
      {path: 'machinery-view', component: MachineryViewComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
