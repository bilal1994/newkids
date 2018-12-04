import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { KidsServicesProvider } from '../../providers/kids-service/kids-service';
import { KidsConfig } from '../../model/kidsDB';
import { AdminPage } from '../admin/admin';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FamilyPage } from '../family/family';


@IonicPage()
@Component({
  selector: 'page-add-new',
  templateUrl: 'add-new.html',
})
export class AddNewPage {

  addkid : KidsConfig ={
    FirstName : '',
    LastName : '',
    Phone : '',
    Address : '',
    Stage : '',
    Password: '',
    Email: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public add : KidsServicesProvider, public alertCtrl: AlertController,
    public myAuth : AngularFireAuth, public authi :AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log("your email : " + this.myAuth.auth.currentUser.email)
    console.log('ionViewDidLoad AddNewPage');
  }
  goBack(){
    this.navCtrl.push(AdminPage)
  }

  addnew(addkid){
      addkid.Email = this.myAuth.auth.currentUser.email
      addkid.Password = this.myAuth.auth.currentUser.uid
      console.log(addkid.Email + '......... ' + addkid.Password)
      this.add.addkid(addkid).then(() => this.showAlert())
      this.navCtrl.setRoot(FamilyPage).then(() =>{
        this.authi.signOut()
      })
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'اضافة طالب',
      subTitle: 'تمت اضافة طالب جديد',
      buttons: ['تم']
    });
    alert.present();
  }


}
