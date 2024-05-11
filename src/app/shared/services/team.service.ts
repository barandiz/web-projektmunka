import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  collectionName = 'Teams';
  subCollectionName = 'Players';

  constructor(private afs: AngularFirestore) { }

  //CRUD
  /* Játékos hozzáadása a csapathoz */
  addUserToTeam(teamId: string, user: User): Promise<void> {
    return this.afs.collection(this.collectionName).doc(teamId).collection(this.subCollectionName).doc(user.id).set(user);
  }

  //CRUD
  create(team: Team) {
    //Melyik kollekcióban, lehet temple-es forma - típusosság
    //Konkrét id-val, nem generáltan
    //add-dal a firestore sdk generálna egyett, most tudjuk - documentumid - doc(útvonal)
    //set() - milyen obejktumot akarunk feltöltni
    //Ha sikeres a beszúrás: most is promiset ad vissza de void - lehet ettől még resolve reject
    return this.afs.collection<Team>(this.collectionName).doc(team.id).set(team);
  }

  /* Összes csapat lekérdezése */
  getAllTeam(): Observable<Team[]> {
    return this.afs.collection<Team>(this.collectionName).valueChanges();
  }


  /* A csapat nevének frissítése */
  updateTeam(team: Team, newName: string) {
    return this.afs.collection<Team>(this.collectionName).doc(team.id).update({team_name: newName});
  }

  // Csapat játékosainak lekérdezése az azonosító alapján
  getPlayersByTeam(teamId: string): Observable<any[]> {
    return this.afs.collection(this.collectionName).doc(teamId).collection(this.subCollectionName, ref => ref.orderBy('username', 'asc')).valueChanges();
  }

  /* A csapat törlése */  
  deleteTeam(id: string) {
    return this.afs.collection<Team>(this.collectionName).doc(id).delete();
  }

  /* Játékos törlése */  
  deletePlayer(teamId: string, playerId: string) {
    return this.afs.collection<Team>(this.collectionName).doc(teamId).collection(this.subCollectionName).doc(playerId).delete();
  }

  // Nem használt függvények:
  /*
  getSpecificTeam(team: Team){
    return this.afs.collection<Team>(this.collectionName).doc(team.id).valueChanges();
  }
  */
}
