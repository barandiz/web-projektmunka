import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;
  dialogRef?: MatDialogRef<DialogComponent>

  constructor(
    private router: Router, 
    private dialog: MatDialog, 
    private authService: AuthService,
  ){}

  ngOnInit(): void{
  }

  openDialog(){
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Sikeres bejelentkezés!', content: `Üdvözöljük!`, buttonText: 'Ok'}
    })

    this.dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog becsukódott');
      this.router.navigateByUrl('/main');
    });

  }

  async login(){
    this.loading = true;
      //promise-nak a credential objektumával dolgozunk
      this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
        console.log(cred);
        this.openDialog();
        this.router.navigateByUrl('/main');
        this.loading = false;
      }).catch(error =>{
        //Ha nincs authentikál felhasználó
        console.error("Hiba: ",error);
        this.loading = false;
      });




  }

  ngOnDestroy(): void {
   this.loadingSubscription?.unsubscribe;
  }
}
