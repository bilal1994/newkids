import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthServiceProvider {
  private user : firebase.User

  constructor(public db : AngularFireAuth) {
    console.log('Hello AuthServiceProvider Provider');

    db.authState.subscribe(assign => {
      this.user = assign
    })
  }

  SignUp(create){
    console.log("sign Up")
    return this.db.auth.createUserWithEmailAndPassword(create.email, create.password);
  }

  SignIn(create){
    console.log("sign in")
      return this.db.auth.signInWithEmailAndPassword(create.email, create.password);    
  }

  signOut(){
    return this.db.auth.signOut()
  }
}
