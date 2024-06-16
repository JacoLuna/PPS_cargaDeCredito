import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private userCredential!: any;
  public userSrv!:firebase.User | null; 

  constructor(private authF: AngularFireAuth) {
    authF.authState.subscribe((user) => {
      this.userSrv = user;
    });
  }

  async loginUser(email: string, password: string) {
    return this.authF.signInWithEmailAndPassword(email, password)
    .then( (credenciales) => {
      this.userCredential = credenciales.credential;
      this.userSrv = credenciales.user;
    });
  }

  async register(email: string, password: string) {
    return this.authF.createUserWithEmailAndPassword(email, password);
  }

  async logOut() {
    return this.authF.signOut()
    .then( () => {
      this.userSrv = null;
    });
  }
}
