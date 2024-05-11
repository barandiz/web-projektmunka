import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { User } from './shared/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Projekt';
  page = 'main';

  //Routes definíciók
  routes: Array<string> = [];

  //Bejelentkezett felhasználó fontosabb adatainak elárolása
  loggedInUser?: firebase.default.User | null;
  editor? : string;
  isEditor?: boolean;
  user?: User;

  constructor(private router: Router,
              private authService: AuthService, 
              private userService: UserService){
  }

  ngOnInit(){
    //fat-arrow, ha nem találna akkor undefined-ot ad vissza, nekünk string kell
    this.routes = this.router.config.map(conf => conf.path) as string[];

    // reaktív programozás
    // subscribe függvény
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      // /jel utáni rész kell ezért 1
      const currantPage = (evts.urlAfterRedirects as string).split('/')[1] as string;

      //Ellenőrzés, hogy benne van-e
      if(this.routes.includes(currantPage)){
        this.page = currantPage;
      }
    });

    //Ha bejelentkezett, akkor obvervable-re fel tudok íratkozni
    this.authService.isUserLoggedIn().subscribe({
      next: (user) => {
        //Ha van user, akkor bejelentkezett
        console.log("Bejelentkezett felhasználó:",user)
        this.loggedInUser = user;
        if(user){
          // User id lekérdezése
          this.userService.getById(user.uid).subscribe({
            next: (data) => {
              if(data){
                this.user = data;
                this.editor = data?.editorOrPlayer;
                this.isEditor = this.editor === "editor";
              //console.log("UserData ", this.isEditor);
              }
              
            },
            error: (error) => {
              console.error(error);
              this.isEditor = false;
            }
          }); 
        }else{
          this.isEditor = false;
        }
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        
      },

      error: (error) =>{
        console.log(error);
        localStorage.setItem('user', JSON.stringify('null'));
        this.isEditor = false;
      }
    });

  }

  // Oldalváltás
  changePage(selectedPage: string) {
    this.page = selectedPage;
    console.log("Change page lefutott, értéke: ", selectedPage);
  }

  //Sidenav 
  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  //Sidenav bezárása
  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
  
  //Kijelentkeztés
  logout(_?: boolean /*A kijelentkezéshez kell, hogy elnyelje az eventet*/){
    this.authService.logout().then(() => {
      this.isEditor = false;
      console.log('Logged out successfully.', this.isEditor);
    }).catch(error => {
      console.error(error);
    });
  }

  

}
