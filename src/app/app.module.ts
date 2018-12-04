import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { FamilyPage } from '../pages/family/family';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';


import { LocalNotifications } from '@ionic-native/local-notifications';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SplashScreen } from '@ionic-native/splash-screen';
import { KidsServicesProvider } from '../providers/kids-service/kids-service';
import { ShowPage } from '../pages/show/show';
import { AddNewPage } from '../pages/add-new/add-new';
import { AngularFireAuth} from '@angular/fire/auth';
import { FCM } from '@ionic-native/fcm';
import {OneSignal} from '@ionic-native/onesignal'
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SingleShowPage } from '../pages/single-show/single-show';

export const fireconfig = {
  apiKey: "AIzaSyCe3H4pnxDfcXWnDjPnpAxNre6dX3FFylc",
  authDomain: "kidsionic.firebaseapp.com",
  databaseURL: "https://kidsionic.firebaseio.com",
  projectId: "kidsionic",
  storageBucket: "kidsionic.appspot.com",
  messagingSenderId: "954449921695"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShowPage,
    AddNewPage,
    AdminPage,
    LoginPage,
    SignUpPage,
    FamilyPage,
    SingleShowPage,
    AddNewPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fireconfig),
    AngularFireDatabaseModule
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AdminPage,
    LoginPage,
    SignUpPage,
    FamilyPage,
    ShowPage,
    SingleShowPage,
    AddNewPage
  
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KidsServicesProvider,
    AuthServiceProvider,
    FCM,
    OneSignal,
    AngularFireAuth, 
    LocalNotifications
    
  
  ]
})
export class AppModule {}
