import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { KidsConfig } from '../../model/kidsDB'

@Injectable()
export class KidsServicesProvider {

  private kidsList = this.db.list<KidsConfig>("kidsdb")

  constructor(public db : AngularFireDatabase ) {
    console.log('Hello KidServicesProvider Provider');
  }

  addkid(newkid : KidsConfig){
    return this.kidsList.push(newkid)
  }

  updatekids(kids : KidsConfig){
    return this.kidsList.update(kids.key , kids)
  }

  deletekids(kids){
    return this.kidsList.remove(kids)
  }

  getkid(){
    return this.kidsList
  }

}
