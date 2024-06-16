import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  user!: User;

  constructor(
    private firestore: AngularFirestore,
    private authSrv: AuthenticationService
  ) {
    this.userCollection = this.firestore.collection<User>('usersQR');
    this.users = this.userCollection.valueChanges();
  }

  async userAdded(user: User) {
    return this.userCollection.add(JSON.parse(JSON.stringify(user)));
  }

  async updateUser(userId: string, user: User) {
    await this.userCollection.doc(userId).set(JSON.parse(JSON.stringify(user)))
    .then(r => {
      return true;
    }).catch( () => {
      return false;  
    });
  }
}
