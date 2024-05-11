import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  //CRUD
  create(user: User) {
    //Melyik kollekcióban, lehet temple-es forma - típusosság
    //Konkrét id-val, nem generáltan
    //add-dal a firestore sdk generálna egyett, most tudjok - documentumid - doc(útvonal)
    //set() - milyen obejktumot akarunk feltöltni
    //Ha sikeres a beszúrás: most is promise de void - lehet ettől még resolve reject
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  /***************************************** Játékosok lekérése *****************************************/
  getPlayers(){
    return this.afs.collection<User>(this.collectionName, ref => ref.where('editorOrPlayer', '==', 'player').orderBy('username', 'asc')).valueChanges();
  }

  /***************************************** User lekérése id alapján *****************************************/
  getById(id: string) {
    //doc(id) - tudjuk az idt-t a storageban lesz
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
    //return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==', id).orderBy('username', 'asc')).valueChanges();
  }

  // Nem használt függvények
  /*
  getAll(): Observable<User[]> {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getPlayerById(playerId: string){
  return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==', playerId).orderBy('username', 'asc')).valueChanges();
  }
  
  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }
  */
 
}
