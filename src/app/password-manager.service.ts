import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  addSite(data: object){
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }

  deleteSite(id: string){
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  loadSites(){
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, {idField:'id'})
  }

  updateSite(id:string, data:object){
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  addPwd(data: object, siteId: string){
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  editPwd(data: object, siteId: string, pwdId: string){
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, pwdId);
    return updateDoc(docInstance, data);
  }

  deletePwd(siteId: string, pwdId: string){
    const docInstance = doc(this.firestore, `sites/${siteId}/passwords`, pwdId);
    return deleteDoc(docInstance);
  }

  loadPwd(siteId: string){
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, {idField:'id'});
  }

}
