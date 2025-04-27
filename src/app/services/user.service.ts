import { Injectable } from '@angular/core';
import { User } from '../interfaces/project';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  COLLECTION_NAME = 'proj_managers'

  constructor(private firestore: Firestore) { }
 async createManager(user:User){
    const managerCollection = collection(this.firestore,this.COLLECTION_NAME)
    await addDoc(managerCollection,user)
  }
  getManagers():Observable<User[]>{
    const managerCollection = collection(this.firestore,this.COLLECTION_NAME)
    return collectionData(managerCollection,({idField:'id'})) as Observable<User[]>
  }
  
}
