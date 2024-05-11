import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  //Objektumsort vár
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    selectedOption: new FormControl(''),
    position: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  dialogRef?: MatDialogRef<DialogComponent>

  constructor(
    private location: Location, 
    private auth: AuthService, 
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog){}

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.signUpForm.value);
    this.auth.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred => {
      const user : User = {
        //Ekkor már létrejön a USerCredential objektum, lesz UID-ja
        //Ha ide lépünk be, nem null lesz.
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        //@ előtti rész a username
        username: (this.signUpForm.get('email')?.value as string).split('@')[0],
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string
        },
        editorOrPlayer: this.signUpForm.get('selectedOption')?.value as string

      };
      //Insert
      this.userService.create(user).then(_ =>{
        console.log('User added successfully.');
        this.openDialog();
        
      }).catch(error => {
        console.log(error);
      });


    }).catch(error => {
      console.log(error);
    });
  }

  openDialog(){
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Sikeres regisztráció!', content: `Üdvözöljük, ${this.signUpForm.get('name.firstname')?.value}!`, buttonText: 'Ok'}
    })

    this.dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog becsukódott');
      this.router.navigateByUrl('/main');
    });

  }

  goBack(){
    this.location.back();
  }
  
}
