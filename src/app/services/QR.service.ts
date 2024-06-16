import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { QR } from '../interfaces/QR';

@Injectable({
  providedIn: 'root'
})
export class QRervice {
  private QRCollection: AngularFirestoreCollection<QR>;
  QR: Observable<QR[]>;

  constructor(private firestore: AngularFirestore) {
    this.QRCollection = this.firestore.collection<QR>('QR');
    this.QR = this.QRCollection.valueChanges();
  }

  // addStat(QR: QR) {
  //   return this.QRCollection.add(QR);
  // }
}
