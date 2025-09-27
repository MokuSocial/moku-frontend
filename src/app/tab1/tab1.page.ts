import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonItem, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonRouterOutlet, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, RouterModule],
})
export class Tab1Page {
  id: number = 1;
  constructor() {}
}
