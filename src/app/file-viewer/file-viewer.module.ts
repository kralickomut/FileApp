import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileViewerPageRoutingModule } from './file-viewer-routing.module';

import { FileViewerPage } from './file-viewer.page';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileViewerPageRoutingModule,
    SharedModule
  ],
  declarations: [FileViewerPage]
})
export class FileViewerPageModule {}
