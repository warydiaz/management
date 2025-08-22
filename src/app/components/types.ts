export interface Tournament {
  tourneyId: string;
  tourneyName: string;
  partners: string[];
  gamesName: string[];
  gameType: string;
  numberOfPlayers: number;
  tablePrizes: Prize[];
  dates: {
    start: string;
    end: string;
  };
}

export interface Prize {
  position: number;
  prize: string;
}

export interface BingoRoom {
  productName: string;
  productSeasonalName: string;
}
