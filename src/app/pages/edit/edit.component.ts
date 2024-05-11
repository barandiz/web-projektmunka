import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { TeamService } from '../../shared/services/team.service';
import { Team } from '../../shared/models/Team';
import { FormControl } from '@angular/forms';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit{
  //Játékos lekérdezéséhez szükséges tagok
  players?: User[];
  selectedPlayerId?: string; 
  selectedPlayerIdToDelete?: string;
  selectedPlayer?: User;

  //Csapat lekérdezéséhez szükséges tagok
  teams?: Team[];
  selectedTeamId?: string;
  teamFormControl = new FormControl('');
  newTeamnameFormControl = new FormControl('');
  selectedTeamIdToDelete?: string;
  selectedTeamIdToRename?: string;
  selectedTeamIdToPlayers?: string;

  dialogRef?: MatDialogRef<DialogComponent>

  constructor(private userService: UserService, private teamService: TeamService, private dialog: MatDialog, private router: Router){

  }
  ngOnInit(): void {
    this.loadPlayers();
    this.loadTeams();

  }

  /***************************************** Játékosok lekérdezése *****************************************/
  loadPlayers() {
    this.userService.getPlayers().subscribe({
      next: (players: User[]) => {
        this.players = players; // Tárold el a játékosokat a 'players' tömbben
      },
      error: (error) => {
        console.error('Hiba történt a játékosok lekérdezése közben:', error);
      }
    });
  }
  

  /***************************************** Játékos beállítása a csapatához *****************************************/  
  setPlayerToTeam(){
    if (this.selectedPlayerId) {
      const selectedPlayer = this.players?.find(player => player.id === this.selectedPlayerId);

      if (selectedPlayer) {
        this.teamService.addUserToTeam(this.selectedTeamId as string, selectedPlayer)
          .then(() => {
            console.log('Játékos hozzáadva a csapathoz:', selectedPlayer);
            this.openDialog();
          })
          .catch(error => {
            console.error('Hiba történt a játékos hozzáadása közben:', error);
          });
      } else {
        console.error('Nem található kiválasztott játékos');
      }
    } else {
      console.error('Nincs kiválasztva játékos');
    }
  }
  

  /***************************************** Csapatok betöltése *****************************************/
  loadTeams(){
    this.teamService.getAllTeam().subscribe({
      next: (teams: Team[]) => {
        this.teams = teams; // Csapatok eltárolása
      },
      error: (error) => {
        console.error('Hiba történt a csapatok lekérdezése közben:', error);
      }
    });
  }

  /***************************************** Csapat létrehozása *****************************************/
  createTeam(){
    const team : Team = {
      //Ha ide lépünk be, nem null lesz.
      id: this.teamFormControl.value as string,
      team_name: this.teamFormControl.value as string
    };
    console.log(this.teamFormControl.value as string);

    //Insert
    this.teamService.create(team).then(_ =>{
      console.log('Team added successfully.');
      this.openDialog();

    }).catch(error => {
      console.log(error);
    });
  }

  /***************************************** Csapat törlése *****************************************/
  deleteTeam(){
    this.teamService.deleteTeam(this.selectedTeamIdToDelete as string);
    this.openDialog();
  }

  /***************************************** Játékos törlése *****************************************/
  deletePlayerFromTeam(){
    this.teamService.deletePlayer(this.selectedTeamIdToPlayers as string , this.selectedPlayerIdToDelete as string);
    this.openDialog();
  }

  /***************************************** Csapat nevének frissítése *****************************************/
  updateTeam(){
    const selectedTeam = this.teams?.find(team => team.id === this.selectedTeamIdToRename);
    this.teamService.updateTeam(selectedTeam as Team, this.newTeamnameFormControl.value as string);
    this.openDialog();
  }  

  /***************************************** Dialógus ablak *****************************************/
  openDialog(){
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Sikeres szerkesztés!', content: 'Változások elmentve.', buttonText: 'Ok'}
    })

    this.dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog becsukódott');
      this.router.navigateByUrl('/edit');
    });

  }

}
