import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
         IonLabel, IonItem, IonButton, IonIcon,IonInput, 
         IonMenu, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonInput,IonIcon, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonButtons, IonMenuButton]

})
export class MenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
