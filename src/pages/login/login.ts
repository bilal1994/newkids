import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
 import { FamilyPage } from '../family/family';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  info = {
    email : '',
    password : ''
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth : AuthServiceProvider, public alertCtrl: AlertController) {
   
     
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }
    
    login() {
      if (this.info.email == "" || this.info.password == "") {
        const alert = this.alertCtrl.create({
          title: 'تنبيه',
          subTitle: 'يرجى ملئ جميع الحقول',
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        this.auth.SignIn(this.info).then(() =>
        this.navCtrl.setRoot(FamilyPage),
        error => {
          const alert = this.alertCtrl.create({
              title: 'تنبيه',
              subTitle: 'خطأ في الايميل او الباسورد',
              buttons: ['OK']
            });
            alert.present();}
        )
      }
 } 
    
    cnclBtn(){
      this.navCtrl.push(HomePage)
    }

  }