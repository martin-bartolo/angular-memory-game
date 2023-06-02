import { Component, Input } from '@angular/core';
import { Card } from 'src/app/Card';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() card: Card;

  constructor(public gameService: GameService) {}

  onCardClick() {
    // If the game is not running or the card is already flipped we do nothing
    if (
      this.card.flipped ||
      !this.gameService.activeGame ||
      this.gameService.isGameOver
    ) {
      return;
    }
    this.gameService.handleFlip(this.card);
  }
}
