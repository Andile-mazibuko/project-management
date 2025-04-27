import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import path from 'path';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private COLLECTION_NAME: string = "projects";
  
  constructor(private fireStore: Firestore){}

  getProjects(): Observable<Project[]>{
    const col = collection(this.fireStore,this.COLLECTION_NAME) 
    return collectionData(col,({idField:"id"})) as Observable<Project[]>
  }

  addProject(project: Project){
    const col = collection(this.fireStore,this.COLLECTION_NAME)
    addDoc(col,project)
  }
  addManager(id:string,email: string,){
    let projRef = doc(this.fireStore,`${this.COLLECTION_NAME}/${id}`)
    updateDoc(projRef,{manager: email})
  }
  deleteProject(project:Project){
    let col = doc(this.fireStore,`${this.COLLECTION_NAME}/${project.id}`)
    deleteDoc(col)
  }
  
}
