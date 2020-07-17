from move import Move
from strategies import find_strategy

c_c_score = [3, 3]
d_c_score = [5, 0]
d_d_score = [1, 1]
last_match = {'games': []}


def games_of(strategy):
    games_of_s = []
    for game in last_match['games']:
        if game['player1name'] == strategy or game['player2name'] == strategy:
            games_of_s.append(game)
    return games_of_s


def merge_strategies(match):
    new_match = []
    for i in range(0, len(match)):
        is_exist = False
        for j in range(0, len(new_match)):
            if match[i]['name'] == new_match[j]['name']:
                is_exist = True
                new_match[j]['quantity'] += match[i]['quantity']
        if not is_exist:
            new_match.append(match[i])
    return new_match


def calc_scores(p1_moves, p2_moves):
    p1_score = 0
    p2_score = 0
    for i in range(0, len(p1_moves)):
        p1_curr_move = p1_moves[i]
        p2_curr_move = p2_moves[i]
        if p1_curr_move == Move.CO_OPERATE and p2_curr_move == Move.CO_OPERATE:
            p1_score += c_c_score[0]
            p2_score += c_c_score[1]
        elif p1_curr_move == Move.CO_OPERATE and p2_curr_move == Move.DEFECT:
            p1_score += d_c_score[1]
            p2_score += d_c_score[0]
        elif p1_curr_move == Move.DEFECT and p2_curr_move == Move.CO_OPERATE:
            p1_score += d_c_score[0]
            p2_score += d_c_score[1]
        elif p1_curr_move == Move.DEFECT and p2_curr_move == Move.DEFECT:
            p1_score += d_d_score[0]
            p2_score += d_d_score[1]
    return [p1_score, p2_score]


def run_game(strategy1, strategy2, rounds):
    """strategy1 and strategy2 are strings representing the names of the playing strategies
        the function returns an array of size two such that the first entry is player1 score
        and the second entry is player2 score"""
    p1 = find_strategy(strategy1)
    p2 = find_strategy(strategy2)
    p1_moves = []
    p2_moves = []
    for i in range(0, rounds):
        p1_next_move = p1.next_move(p1_moves, p2_moves)
        p2_next_move = p2.next_move(p2_moves, p1_moves)
        p1_moves.append(p1_next_move)
        p2_moves.append(p2_next_move)
    scores = calc_scores(p1_moves, p2_moves)
    game = {
        'player1name': strategy1,
        'player2name': strategy2,
        'player1score': scores[0],
        'player2score': scores[1],
        'player1moves': list(map(lambda m: m.value, p1_moves)),
        'player2moves': list(map(lambda m: m.value, p2_moves)),
        'numOfGames': 0,
    }
    return [scores, game]


def parse_map_to_list(scores_map):
    scores_list = []
    for key in scores_map:
        scores_list.append({
            'name': key,
            'score': scores_map[key]
        })
    return scores_list


def make_match(match, rounds):
    """match holds data from how much players are from each strategy"""
    match = merge_strategies(match)
    scores = {}  # a map from strategy names to the total score gained by those strategies
    games = []
    for strategy in match:
        scores[strategy['name']] = 0
    for i in range(0, len(match)):
        for j in range(i, len(match)):
            strategy1 = match[i]
            strategy2 = match[j]
            [result, game] = run_game(strategy1['name'], strategy2['name'], rounds)
            s1_quan = int(strategy1['quantity'])
            s2_quan = int(strategy2['quantity'])
            if i != j:
                # there are s1_quan players of strategy1 each playing against s2_quan players
                # we want the average total score of a player with strategy1
                # result[0]*s2_quan will give us the total score of one player, and then
                # result[0]*s2_quan*s1_quan will be the sum over all players of strategy1 and to get the average
                # we divide by s1_quan
                scores[strategy1['name']] += result[0] * s2_quan
                scores[strategy2['name']] += result[1] * s1_quan
                game['numOfGames'] = s1_quan * s2_quan
            else:
                # since the same strategy is playing against itself each player will play against all other players
                # meaning that a player players (s1_quan - 1) games
                scores[strategy1['name']] += result[0] * (s1_quan - 1)
                game['numOfGames'] = s1_quan * (s1_quan - 1)
            games.append(game)
    last_match['games'] = games
    return {
        'scores': parse_map_to_list(scores),
        'games': games
    }




































class Match:
    last_match = None

    def __init__(self, players_data):
        self.players = []
        self.players_map = {}
        self.games_of_players = {}
        self.games = []
        for p_data in players_data:
            self.players_map[p_data['name']] = []
            self.games_of_players[p_data['name']] = []
            for i in range(0, int(p_data['quantity'])):
                player = Player(find_strategy(p_data['name']))
                self.players.append(player)
                self.players_map[p_data['name']].append(player)

    def run(self):
        """run all possible games between the given players"""
        for i in range(0, len(self.players)):
            for j in range(i + 1, len(self.players)):
                game = Game(20, self.players[i], self.players[j], [3, 3], [5, 0], [1, 1])
                game.start()
                self.games.append(game)
                self.games_of_players[game.player1.get_strategy().name].append(game)
                self.games_of_players[game.player2.get_strategy().name].append(game)

    def get_results(self):
        """calculates the average points earned by each strategy"""
        results = []
        for strategy in self.players_map:
            accumulator = 0
            for player in self.players_map[strategy]:
                accumulator += player.total_score
            results.append({"name": strategy, "score": accumulator / len(self.players_map[strategy])})
        return results

    def games_of(self, strategy):
        return list(map(Game.game_to_map, self.games_of_players[strategy]))

    def get_games(self):
        return list(map(Game.game_to_map, self.games))


class Game:
    """A class representing a game between two players"""
    cache = {}

    @staticmethod
    def game_to_map(game):
        return (
            {
                "player1name": game.player1.get_strategy().name,
                "player2name": game.player2.get_strategy().name,
                "player1score": game.player1_score,
                "player2score": game.player2_score,
                "player1moves": list(map(lambda m: m.value, game.player1.get_moves())),
                "player2moves": list(map(lambda m: m.value, game.player2.get_moves()))
            }
        )

    def __init__(self, rounds, player1, player2, c_c_score, d_c_score, d_d_score):
        self.rounds = rounds
        self.player1 = player1
        self.player2 = player2
        self.player1.reset()
        self.player2.reset()
        self.player1_score = 0
        self.player2_score = 0
        self.c_c_score = c_c_score
        self.d_c_score = d_c_score
        self.d_d_score = d_d_score

    def get_enemy_moves(self, player):
        """returns an array of moves of the player which is not player"""
        return self.player1.get_moves() if player == self.player2 else self.player1.get_moves()

    def start(self):
        """executes the game"""
        for i in range(0, self.rounds):
            self._run_next_turn()
        self.calculate_game_score()

    def _run_next_turn(self):
        """calculates the next move of both players"""
        player1_moves = self.player1.get_moves()
        player2_moves = self.player2.get_moves()
        player1_new_move = self.player1.calc_next_move(player2_moves)
        player2_new_move = self.player2.calc_next_move(player1_moves)
        move = Move.CO_OPERATE
        player1_moves.append(player1_new_move)
        player2_moves.append(player2_new_move)

    def calculate_game_score(self):
        self.player1_score = 0
        self.player2_score = 0
        player1_moves = self.player1.get_moves()
        player2_moves = self.player2.get_moves()
        for i in range(0, self.rounds):
            p1_curr_move = player1_moves[i]
            p2_curr_move = player2_moves[i]
            if p1_curr_move == Move.CO_OPERATE and p2_curr_move == Move.CO_OPERATE:
                self.player1_score += self.c_c_score[0]
                self.player2_score += self.c_c_score[1]
            if p1_curr_move == Move.CO_OPERATE and p2_curr_move == Move.DEFECT:
                self.player1_score += self.d_c_score[1]
                self.player2_score += self.d_c_score[0]
            if p1_curr_move == Move.DEFECT and p2_curr_move == Move.CO_OPERATE:
                self.player1_score += self.d_c_score[0]
                self.player2_score += self.d_c_score[1]
            if p1_curr_move == Move.DEFECT and p2_curr_move == Move.DEFECT:
                self.player1_score += self.d_d_score[0]
                self.player2_score += self.d_d_score[1]
        self.player1.update_total_score(self.player1_score)
        self.player2.update_total_score(self.player2_score)


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
