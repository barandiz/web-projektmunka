import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string){
    //promiset ad vissza
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email:string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  logout(){
    return this.auth.signOut();
  }

  isUserLoggedIn(){
    //ha van akkor visszaadja az Observable , ha nem akkor null
    return this.auth.user;
  }

  
}
