import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ArticleComponent} from './article/article.component';
import {RoomsComponent} from './rooms/rooms.component';
import {MainComponent} from './main/main.component';
import {NewsComponent} from './news/news.component';
import {ContactsComponent} from './contacts/contacts.component';
import {SliderComponent} from './main/slider/slider.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainRoomsComponent} from './main/main-rooms/main-rooms.component';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {GlobalImportsModule} from '../../../shared/config/global-imports/global-imports.module';
import {PagesComponent} from './pages.component';
import {ServiceComponent} from './service/service.component';
import {RoomsBookingComponent} from './rooms-booking/rooms-booking.component';
import {TopSliderComponent} from './main/top-slider/top-slider.component';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {ProposalComponent} from "./proposal/proposal.component";
import {ProposalItemComponent} from "./main/proposal-item/proposal-item.component";
import { AvailableRoomsComponent } from './available-rooms/available-rooms.component';
import { LoginComponent } from './login/login.component';
import {BookFormComponent} from './book-form/book-form.component';

@NgModule({
  imports: [
    NgbModule,
    GlobalImportsModule,
    BsDatepickerModule
  ],
  declarations: [
    NewsComponent,
    ContactsComponent,
    RoomsComponent,
    SliderComponent,
    ArticleComponent,
    MainComponent,
    MainRoomsComponent,
    MenuComponent,
    FooterComponent,
    PagesComponent,
    ServiceComponent,
    RoomsBookingComponent,
    TopSliderComponent,
    ProposalComponent,
    ProposalItemComponent,
    AvailableRoomsComponent,
    LoginComponent,
    BookFormComponent

  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
}


