import { Injectable } from '@angular/core';
import { User } from '../interfaces/project';
import { addDoc, collection, collectionData, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  COLLECTION_NAME = 'users'

  constructor(private firestore: Firestore) { }
 async createManager(user:User){
    user.password = this.hashPassword(user.password!)
    
    const managerCollection = collection(this.firestore,this.COLLECTION_NAME)
    await addDoc(managerCollection,user)
  }
  getUsers():Observable<User[]>{
    const managerCollection = collection(this.firestore,this.COLLECTION_NAME)
    return collectionData(managerCollection,({idField:'id'})) as Observable<User[]>
  }
  async getUser(email:string,password: string):Promise<User | null>{
    let myUser!: User
    const new_password = this.hashPassword(password)
    console.log("HASHED PASS",new_password)
    let col = collection(this.firestore,this.COLLECTION_NAME)
    const myquery = query(col,where("email","==", email),where("password","==",new_password));
    const data = await getDocs(myquery)
    
    if (!data.empty){
      return data.docs[0].data() as User
    }
    return null
  }
  hashPassword(password:string){
    return CryptoJS.SHA256(password).toString()
  }
  
}
