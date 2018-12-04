import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AdminPage } from '../admin/admin';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Password : any;

  constructor(public navCtrl: NavController, public alert: AlertController) {

  }

  admin() {
    const prompt = this.alert.create({
      title: 'تسجيل الدخول',
      message: "ادخل كلمة المرور رجاءا",
      inputs: [
        {
          name: 'Password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.Password= data.Password;
            if (this.Password == 20182018) {
              this.navCtrl.setRoot(AdminPage)
            }
            else{
              this.navCtrl.setRoot(HomePage)
            }
          }
        }
      ]
    });
    prompt.present();
  }
  
  family(){
    this.navCtrl.push(LoginPage)
  }

}
