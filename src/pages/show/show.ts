import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KidsServicesProvider } from '../../providers/kids-service/kids-service';
import { KidsConfig } from '../../model/kidsDB';
import { AngularFireDatabase, AngularFireObject, } from '@angular/fire/database';
import { AdminPage } from '../admin/admin';
import { SingleShowPage } from '../single-show/single-show';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {
  Password: string=''
  Email : string=''
  

  kidsList : AngularFireObject<any>
  myKid : KidsConfig = {
    FirstName : '',
    LastName : '',
    Phone : '',
    Address : '',
    Stage : '',
    Password: '',
    Email : ''
  };

  itemArray =[];
  myObject = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public alertCtrl: AlertController,
    public edit: KidsServicesProvider, db: AngularFireDatabase) {

      this.kidsList = db.object("kidsdb");
      this.kidsList.snapshotChanges().subscribe(fun => {
        if (fun.payload.val() == null || fun.payload.val() == undefined){
          console.log("no data")
        }
        else{
          this.itemArray.push(fun.payload.val())
          console.log(this.itemArray)
          this.myObject = Object.entries(this.itemArray[0])
          console.log(this.myObject)

        }
      });
  }
  goBack(){
    this.navCtrl.push(HomePage)
  
    console.log('goBackIsClicked')
  }

  show(FirstName, LastName, Phone, Address,Stage, Email,Password){
   this.navCtrl.push(SingleShowPage,{
    FirstName : FirstName,
    LastName : LastName,
    Phone: Phone,
    Address: Address,
    Stage: Stage,
    Email : Email,
    Password : Password
   })
}


  update(editKids){
    this.edit.updatekids(editKids)
    console.log("updated")
    this.navCtrl.setRoot(ShowPage)
  }

  Delete(kids){
    this.edit.deletekids(kids)
    console.log("Deleted")
    this.navCtrl.setRoot(AdminPage)
  }

  showPrompt(key, FirstName, LastName, Phone, Address, Email,Password) {
    let prompt = this.alertCtrl.create({
      title: 'تعديل',
      message: "يمكن تعديل بيانات الطالب",
      inputs: [
        {
          name: 'FirstName',
          placeholder:'الاسم الاول',
          value: FirstName
        },
        {
          name: 'LastName',
          placeholder: 'الاسم الثاني',
          value: LastName
        },
        {
          name: 'Phone',
          placeholder: 'الهاتف',
          value: Phone
        },
        {
          name: 'Address',
          placeholder: ' العنوان',
          value: Address
        },
        {
          name: 'Email',
          placeholder: 'البريد اللكتروني ',
          value: Email
        },
       {
         name: 'Password',
         placeholder: ' كلمة المرور',
         value: Password
      },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.myKid.FirstName = data.FirstName;
            this.myKid.LastName = data.LastName;
            this.myKid.Phone = data.Phone;
            this.myKid.Address = data.Address;
            this.myKid.Password = data.Password;
            this.myKid.key = key;
            console.log(this.myKid)
            this.update(this.myKid)
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPage');
  }

}
