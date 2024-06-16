import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonLabel,
  IonItem,
  IonButton,
  IonIcon,
  IonInput,
  IonList,
  IonFabButton,
  IonFab,
  IonChip,
  IonSpinner, IonToast, IonAlert } from '@ionic/angular/standalone';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { Router } from '@angular/router';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
} from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { QRervice } from 'src/app/services/QR.service';
import { QR } from 'src/app/interfaces/QR';
import { User } from 'src/app/classes/user';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonAlert, IonToast, 
    IonSpinner,
    IonChip,
    IonFab,
    IonFabButton,
    IonList,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MenuComponent,
    IonMenu,
    IonMenuButton,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    IonInput,
  ],
})
export class HomePage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  QRs: QR[] = [];
  user!: User;
  cargando: boolean = true;
  qrEscaneado: string = '';
  isAlertOpen = false;

  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      cssClass: 'cancel',
      handler: () => {
        this.isAlertOpen = false;
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      cssClass: 'confirm',
      handler: () => {
        this.clean();
        this.isAlertOpen = false;
      },
    },
  ];

  QRtest!: QR;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private authSrv: AuthenticationService,
    private userSrv: UserService,
    private qrSrv: QRervice,
    private toastController: ToastController
  ) {
    addIcons(ionIcons);
  }

  logOut() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    BarcodeScanner.isSupported()
      .then((result) => {
        this.isSupported = result.supported;
      })
      .catch((e) => {
        console.error(e);
      });
    this.cargar().then(() => (this.cargando = true));
  }

  async cargar() {
    this.qrSrv.QR.subscribe((QR) => {
      this.QRs = QR;
    });
    this.userSrv.users.subscribe((r) => {
      r.forEach((element) => {
        let creditos: number = 0;

        if (element.uid == this.authSrv.userSrv?.uid) {
          element.QRs.forEach((e) => {
            creditos += Number(e.valor);
          });
          this.user = new User(
            element.name,
            element.surname,
            element.alias,
            element.correo,
            element.uid,
            element.rol,
            creditos,
            element.QRs
          );
        }
      });
      this.cargando = false;
    });
  }
  btnLimpiarClick(){
    this.isAlertOpen = true;
  }
  clean() {
    this.user.QRs = [];
    this.user.creditos = 0;
    this.userSrv.updateUser(this.user.uid, this.user);
  }
  async scan(): Promise<void> {
    let cont = 0;
    let valido: boolean = true;
    let QR = {
      codigo: 'invalido',
      valor: -1,
    };
    const granted = await this.requestPermissions();
    if (!granted) {
      this.showToast("Faltan los permisos de uso de la camara", "danger");
      return;
    }
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });

    this.barcodes.push(...barcodes);

    this.barcodes.forEach((e) => {
      this.qrEscaneado = e.rawValue.split(' ')[0];
    });

    this.QRs.forEach((qr) => {
      if (this.qrEscaneado == qr.codigo) {
        QR = {
          codigo: qr.codigo,
          valor: qr.valor,
        };
      }
    });

    if (QR.valor != -1) {
      this.user.QRs.forEach((qr) => {
        if (qr.codigo == QR.codigo) {
          cont++;
        }
      });

      if (this.user.rol == 'admin') {
        if (cont >= 2) {
          valido = false;
        }
      } else {
        if (cont >= 1) {
          valido = false;
        }
      }
      if(valido){
        this.user.QRs.push(QR);
        this.user.QRs.forEach((e) => {
          this.user.creditos += e.valor;
        });
        this.userSrv.updateUser(this.user.uid, this.user);
        this.showToast(`Sumaste ${QR.valor} créditos!`,"success");
      }else{
        this.showToast("LLegaste al límite de escaneos de ese código", "danger");
      }

      cont = 0;
    }
  }
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async showToast(mensaje: string, color: 'success'|'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'middle',
      color: color,
    });
    await toast.present();
  }
}
