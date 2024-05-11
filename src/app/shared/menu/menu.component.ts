import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit{
  @Input() currentPage: string = '';

  //Ide is kell a loggedInUser
  @Input() loggedInUser?: firebase.default.User | null;
  @Input() isEditor?: boolean;

  //Kijelentkezés küldése az appcomponent felé
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  //eseményküldés - EventEmitter az @angolar-coreból
  //Output lesz, meg kell jelölni - vmilyen adatot fogunk kapni
  //visszaküljön annak, aki ezt meghívta
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();


  constructor(){
    console.log('constructor called.');
  }

  ngOnInit():  void {
    console.log('ngOnInit called.');
  }

  ngAfterViewInit(): void{
    console.log('ngAfterViewInit called.');
  }

  //Ezt küldjük az ősnek
  // Az emit értéket adjuk a komponensnek (app-menu)
  menuSwitch(pageValue: string){
    this.selectedPage.emit(pageValue);
  }

  close(logout?: boolean){
    this.onCloseSidenav.emit(true);
    //Kiléptetés ha ráment a logoutra
    if(logout === true){
      this.onLogout.emit(logout);
    }
  }
}
