import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import {ShopComponent} from "./shop.component";
import {ListComponent} from "./list/list.component";
import {ViewerComponent} from "./viewer/viewer.component";
import {FormsModule} from "@angular/forms";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";


@NgModule({
  declarations: [
    ShopComponent,
    ListComponent,
    ViewerComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule
  ]
})
export class ShopModule { }
