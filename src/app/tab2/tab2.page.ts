import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {
  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {
    this.menuCtrl.enable(true, 'tab2-menu'); // Enable menu for Tab 2
  }

  ngOnDestroy() {
    this.menuCtrl.enable(false, 'tab2-menu'); // Disable menu when leaving
  }
}
