import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  addSite(data: object){
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }

  loadSites(){
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, {idField:'id'})
  }

  updateSite(id:string, data:object){
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }

}
