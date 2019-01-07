import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { OneSignal } from '@ionic-native/onesignal';
import { AngularFireDatabase } from '@angular/fire/database';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public auth : AngularFireAuth,public oneSignal: OneSignal,public db : AngularFireDatabase) {


     
    auth.authState.subscribe(user => {

      
      if(user != undefined){
        if(!user.emailVerified){
          this.rootPage = HomePage
      }

      if(user.emailVerified){
        
        this.rootPage = TabsPage
    }
      
      }

      if(user == undefined){
        this.rootPage = HomePage
      }

    })


    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.oneSignal.startInit('91e98635-86c9-4ace-9baf-b66c73ddc968', '954449921695');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      
      this.oneSignal.endInit();

         this.mynote();

      
    });
  }

  

  mynote(){



    this.auth.authState.subscribe(user => {
      if(user != undefined){
    
          this.oneSignal.getIds().then( id => {
           var sub = this.db.list("ids",ref => ref.orderByChild("id").equalTo(id.userId)).valueChanges().subscribe( mdata => {
             if(mdata[0] == undefined){
               this.db.list("ids").push({
                 id:id.userId,
                 email:this.auth.auth.currentUser.email
               }).then( ()=> {
                 sub.unsubscribe();
               })
             }
            });
            });
    
      }
    })

    
      }
    
    

}
