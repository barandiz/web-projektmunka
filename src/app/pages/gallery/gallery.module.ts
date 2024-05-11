import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { MatCard, MatCardModule } from '@angular/material/card';
import { GalleryComponent } from './gallery.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatGridListModule,
    FlexLayoutModule
  ]
})
export class GalleryModule { }
