import { Injectable } from '@angular/core';
import { Card } from '../Card';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cards: Card[] = [];
  pair: Card[] = [];
  activePlayer: string;
  activeGame: boolean;
  redScore: number;
  greenScore: number;
  isGameOver: boolean;
  winner: string;

  constructor() {
    this.newGame();
  }

  // initialize game state
  newGame() {
    const players = ['red', 'green'];
    // make random player start
    this.activePlayer = players[Math.floor(Math.random() * players.length)];
    this.cards = this.createCards();
    this.activeGame = true;
    this.greenScore = 0;
    this.redScore = 0;
    this.isGameOver = false;
  }

  // shuffle array of numbers for random cards
  shuffle(vals: number[]): number[] {
    return vals.sort(() => Math.random() - 0.5);
  }

  // initialize cards with random values
  createCards() {
    let cards = [];
    let vals = this.shuffle([
      0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
    ]);
    for (let i = 0; i < 20; i++) {
      cards.push({ id: i, flipped: false, value: vals[i], color: 'white' });
    }
    return cards;
  }

  // handle player flipping a card
  handleFlip(card: Card) {
    // Flip card
    card.flipped = true;
    this.pair.push(card);

    // When player has flipped 2 cards
    if (this.pair.length === 2) {
      if (this.pair[0].value === this.pair[1].value) {
        // Increase Score
        this.activePlayer === 'red' ? this.redScore++ : this.greenScore++;
        // Change card colors
        this.pair.forEach((cardInPair) => {
          this.cards.filter((card) => card.id === cardInPair.id)[0].color =
            this.activePlayer;
        });
        // Reset pair
        this.pair = [];
        // Check for end of game
        if (this.isEndOfGame()) {
          this.isGameOver = true;
          this.winner = this.getWinner();
        }
      } else {
        // Set turn to inactive to prevent further flips
        this.activeGame = false;
        setTimeout(() => {
          // Flip cards back over
          this.pair.forEach((cardInPair) => {
            this.cards.filter((card) => card.id === cardInPair.id)[0].flipped =
              false;
          });
          // Change player
          this.activePlayer = this.activePlayer === 'green' ? 'red' : 'green';
          // Reset pair
          this.pair = [];
          // Set game back to active so that we can flip again
          this.activeGame = true;
        }, 1000);
      }
    }
  }

  // Check if all cards are flipped
  isEndOfGame(): boolean {
    for (const card of this.cards) {
      if (card.flipped === false) return false;
    }
    return true;
  }

  // Check who the winner is when the game ends
  getWinner(): string {
    if (this.redScore > this.greenScore) {
      return 'red';
    } else if (this.greenScore > this.redScore) {
      return 'green';
    } else {
      return 'tie';
    }
  }
}
