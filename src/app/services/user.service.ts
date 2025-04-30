import { Injectable } from '@angular/core';
import { User } from '../interfaces/project';
import { addDoc, collection, collectionData, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  COLLECTION_NAME = 'users'

  constructor(private firestore: Firestore) { }
 async createManager(user:User){
    const managerCollection = collection(this.firestore,this.COLLECTION_NAME)
    await addDoc(managerCollection,user)
  }
  getUsers():Observable<User[]>{
    const managerCollection = collection(this.firestore,this.COLLECTION_NAME)
    return collectionData(managerCollection,({idField:'id'})) as Observable<User[]>
  }
  async getUser(email:string,password: string):Promise<User | null>{
    let myUser!: User
    let col = collection(this.firestore,this.COLLECTION_NAME)
    const myquery = query(col,where("email","==", email),where("password","==",password));
    const data = await getDocs(myquery)
    
    if (!data.empty){
      return data.docs[0].data() as User
    }
    return null
  }
  
}
