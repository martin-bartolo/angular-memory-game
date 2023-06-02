import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-memory-game';
  constructor(public gameService: GameService) {}

  newGame() {
    this.gameService.newGame();
  }
}
