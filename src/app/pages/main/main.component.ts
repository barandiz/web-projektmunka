import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../shared/services/team.service';
import { Team } from '../../shared/models/Team';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  teams?: Team[];
  playersByTeam: { [teamId: string]: any[] } = {};

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.loadTeams();
    console.log('Csapatok:', this.teams);
  }

  /***************************************** Csapatok betöltése *****************************************/
  loadTeams(){
    this.teamService.getAllTeam().subscribe({
      next: (team: Team[]) => {
        this.teams = team; // Csapatok eltárolása
        this.loadPlayersForTeams();
      },
      error: (error) => {
        console.error('Hiba történt a csapatok lekérdezése közben:', error);
      }
    });

  }

  /***************************************** Játékosok betöltése a csapatokhoz *****************************************/
  loadPlayersForTeams() {
    if (this.teams) {
      this.teams.forEach(team => {
        this.teamService.getPlayersByTeam(team.id).subscribe({
          next: (players: any[]) => {
            //Játékosok eltárolása csapatonként
            this.playersByTeam[team.id] = players.map(player => player.name.lastname + " " + player.name.firstname); 
          },
          error: (error) => {
            console.error('Hiba történt a játékosok lekérdezése közben:', error);
          }
        });
      });
    }

  }

  
}
