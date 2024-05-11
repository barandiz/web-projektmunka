import { Component } from '@angular/core';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: User | undefined;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    // Ellenőrizd, hogy a felhasználó be van-e jelentkezve
    this.authService.isUserLoggedIn().subscribe(user => {
      if (user) {
        this.userService.getById(user.uid).subscribe(userData => {
          this.user = userData;
        });
      }
    });
  }
}
