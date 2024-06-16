import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonIcon,IonInput, IonToast } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonToast, IonInput,IonIcon, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class RegisterPage implements OnInit {

  constructor(private router : Router, private AuthService :AuthenticationService, private userSrv: UserService) { }

  protected email : string =  '';
  protected pass : string =  '';
  protected repatedPass : string =  '';
  protected nombre : string = '';
  protected apellido : string = '';
  protected alias : string = '';
  protected isToastOpen : boolean = false;


  llenarCampos() {
    this.email =  "usuario1@gmail.com";
    this.pass =  "123456";
    this.repatedPass =  "123456";
    this.nombre = "usuario1";
    this.apellido = "usuario1";
    this.alias = "usuario1";
  }

  ngOnInit() {
  }

  registerUser(){
    if(this.pass == this.repatedPass){

      this.AuthService.register(this.email,this.pass).
      then( response => {
        let user;
        if(response.user?.uid){
          user = new User(this.nombre, this.apellido, this.alias, this.email, response.user?.uid, "usuario", 0, []);
        }else{
          user = new User(this.nombre, this.apellido, this.alias, this.email, "", "", 0, []);
        }
        this.userSrv.userAdded(user);
        this.router.navigate(['/home']);
      }).catch( Error => {
        console.error("error al registrarse", Error);
        this.setOpen(true);
      })

    }else{
      this.setOpen(true);
    }
  }

  setOpen(isOpen: boolean){
    this.isToastOpen = isOpen;
  }
  toastDismissed(){
    this.isToastOpen = false;
  }
}
