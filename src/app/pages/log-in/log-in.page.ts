import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonButton,
  IonIcon,
  IonInput,
  IonToast,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonInput,
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class LogInPage implements OnInit {
  constructor(
    private router: Router,
    private AuthService: AuthenticationService
  ) {}

  buttons: { numero: number; nombre: string }[] = [
    { numero: 1, nombre: 'Jaco' },
    { numero: 2, nombre: 'Tomás' },
    { numero: 3, nombre: 'Admin' },
  ];

  protected email: string = '';
  protected password: string = '';
  protected isToastOpen: boolean = false;

  ngOnInit() {}

  btnLogin() {
    this.AuthService.loginUser(this.email, this.password)
      .then((Response) => {
        console.log('inicio de sesion exitoso');
        this.email = "";
        this.password = "";
        this.router.navigate(['home']);
      })
      .catch((Error) => {
        console.error('error al iniciar sesion', Error);
        this.setOpen(true);
      });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  btnUser(user: any) {
    switch (user.detail.value) {
      case "Jaco":
        this.email = 'jacoluna00@gmail.com';
        this.password = '123456';
        break;
      case "Tomás":
        this.email = 'tomaspierini00@gmail.com';
        this.password = '123456';
        break;
      case "Admin":
        this.email = 'admin@gmail.com';
        this.password = '123456';
        break;
    }
  }

  cancel(event: any){
    event.srcElement.value = "seleccione un usuario";
    event.target.inputId = "ion-sel-0";
    this.email = '';
    this.password = '';
  }
}
