

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { OneSignal } from '@ionic-native/onesignal';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { FCM } from '@ionic-native/fcm';
import { SignUpPage } from '../sign-up/sign-up';
import { AngularFireAuth} from '@angular/fire/auth';
import { ShowPage } from '../show/show';
import { AddNewPage } from '../add-new/add-new';
// import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  titlefirebase:'';
  bodyfirebase:'';
  


  constructor(public navCtrl: NavController, public navParams: NavParams,

public alertCtrl: AlertController,private LocalNotifications :LocalNotifications ,private fcm:FCM ,public authi : AngularFireAuth ,public oneSignal: OneSignal,  public db : AngularFireDatabase) {
  }

  firebaseMessage(){
    this. fcm.getToken().then(token => {
      //alert(token);
     });
     
     this.fcm.onNotification().subscribe(data => {
       if(data.wasTapped){
         console.log("Received in background");
       alert(data.title+ " / "+ data.body);
       this.titlefirebase=data.title;
       this.bodyfirebase=data.body;
       } else {
         console.log("Protect kindergarten");
        alert("Protect kindergarten");
       };
     });
     
  ;
     
   }
  goBack(){
  this.navCtrl.push(HomePage)

  console.log('goBackIsClicked')
}
  // notice(){
  //   this.notify.schedule({
  //     id: 1,
  //     text: 'hi from admin',
  //     title: 'your notify'
  //     // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
  //     // data: { secret: this.addkid }
  //   });
  // }
 
  add(){
    if (this.authi.auth.currentUser) {
      this.navCtrl.push(AddNewPage)
    console.log("Added")
    }
    else{
      console.log("no auth")
      this.showAlert()

    }  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'تنبيه',
      subTitle: 'عفوا لم تقم بتسجيل الدخول',
      buttons: ['OK']
    });
    alert.present();
  }

  show(){
    this.navCtrl.push(ShowPage)
    console.log("Showed")
  }

  signOut(){
    this.authi.auth.signOut()
    this.navCtrl.setRoot(HomePage)
  }

  SignUp(){
    this.navCtrl.push(SignUpPage)
  }
  send(){
    this.db.list("ids").valueChanges().subscribe( ids => {
    
            ids.forEach(id => {
        
             
              this.oneSignal.postNotification({
                app_id:"3a315760-1e5d-4301-ac23-2d13ac4b6697",
                include_player_ids:[id['id']],
                contents: {
                  en: "message"
                },
                headings: {
                  en: "header"
                }
              })
            
      
             
            })
        
          })
    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

}
