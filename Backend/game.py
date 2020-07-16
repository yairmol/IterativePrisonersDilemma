from move import Move
from strategies import find_strategy


class Match:
    def __init__(self, players_data):
        self.players = []
        self.players_map = {}
        self.games = []
        for p_data in players_data:
            self.players_map[p_data['name']] = []
            for i in range(0, int(p_data['quantity'])):
                player = Player(find_strategy(p_data['name']))
                self.players.append(player)
                self.players_map[p_data['name']].append(player)

    def run(self):
        """run all possible games between the given players"""
        for i in range(0, len(self.players)):
            for j in range(i+1, len(self.players)):
                game = Game(20, self.players[i], self.players[j], [3, 3], [5, 0], [1, 1])
                game.start()
                self.games.append(game)

    def get_results(self):
        """calculates the average points earned by each strategy"""
        results = []
        for strategy in self.players_map:
            accumulator = 0
            for player in self.players_map[strategy]:
                accumulator += player.total_score
            results.append({"name": strategy, "score": accumulator/len(self.players_map[strategy])})
        return results


class Game:
    """A class representing a game between two players"""
    def __init__(self, rounds, player1, player2, c_c_score, d_c_score, d_d_score):
        self.rounds = rounds
        self.player1 = player1
        self.player2 = player2
        self.player1.reset()
        self.player2.reset()
        self.c_c_score = c_c_score
        self.d_c_score = d_c_score
        self.d_d_score = d_d_score

    def get_enemy_moves(self, player):
        """returns an array of moves of the player which is not player"""
        return self.player1.get_moves() if player == self.player2 else self.player1.get_moves()

    def start(self):
        """executes the game"""
        print("running game: player1 -", self.player1.get_strategy().name, "player2 -", self.player2.get_strategy().name)
        for i in range(0, self.rounds):
            self._run_next_turn()
        self.calculate_game_score()

    def _run_next_turn(self):
        """calculates the next move of both players"""
        player1_moves = self.player1.get_moves()
        player2_moves = self.player2.get_moves()
        player1_new_move = self.player1.calc_next_move(player2_moves)
        player2_new_move = self.player2.calc_next_move(player1_moves)
        print("player1 move:", player1_new_move, ",player2 move:", player2_new_move)
        player1_moves.append(player1_new_move)
        player2_moves.append(player2_new_move)

    def calculate_game_score(self):
        player1_score = 0
        player2_score = 0
        player1_moves = self.player1.get_moves()
        player2_moves = self.player2.get_moves()
        for i in range(0, self.rounds):
            p1_curr_move = player1_moves[i]
            p2_curr_move = player2_moves[i]
            if p1_curr_move == Move.CO_OPERATE and p2_curr_move == Move.CO_OPERATE:
                player1_score += self.c_c_score[0]
                player2_score += self.c_c_score[1]
            if p1_curr_move == Move.CO_OPERATE and p2_curr_move == Move.DEFECT:
                player1_score += self.d_c_score[1]
                player2_score += self.d_c_score[0]
            if p1_curr_move == Move.DEFECT and p2_curr_move == Move.CO_OPERATE:
                player1_score += self.d_c_score[0]
                player2_score += self.d_c_score[1]
            if p1_curr_move == Move.DEFECT and p2_curr_move == Move.DEFECT:
                player1_score += self.d_d_score[0]
                player2_score += self.d_d_score[1]
        self.player1.update_total_score(player1_score)
        self.player2.update_total_score(player2_score)


class Player:
    """A Class representing a player in the prisoners dilemma game"""
    def __init__(self, strategy):
        self._my_previous_moves = []
        self._strategy = strategy
        self.total_score = 0

    def calc_next_move(self, enemy_moves):
        return self._strategy.next_move(self._my_previous_moves, enemy_moves)

    def get_moves(self):
        return self._my_previous_moves

    def reset(self):
        self._my_previous_moves.clear()

    def update_total_score(self, score):
        self.total_score += score

    def get_strategy(self):
        return self._strategy
