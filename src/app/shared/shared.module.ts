import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedHeaderComponent } from '../components/shared-header/shared-header.component';
import {RouterLink} from "@angular/router";
import {SharedMenuComponent} from "../components/shared-menu/shared-menu.component";

@NgModule({
  declarations: [SharedHeaderComponent, SharedMenuComponent],
  imports: [CommonModule, IonicModule, RouterLink],
  exports: [SharedHeaderComponent, SharedMenuComponent],
})
export class SharedModule {}
