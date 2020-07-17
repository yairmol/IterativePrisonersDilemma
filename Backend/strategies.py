from move import Move


# class Aviv:
#     def __init__(self):
#         self.toDefect = False
#
#     def next_move(self):
#


def find_strategy(strategy):
    """return a strategy given the strategy name"""
    strategy_factory = strat_dict[strategy]
    strategy_object = strategy_factory()
    return strategy_object


def alternating(my_moves, enemy_moves):
    if len(my_moves) == 0:
        return Move.CO_OPERATE
    else:
        if len(my_moves) == 1:
            return Move.DEFECT
        else:
            return my_moves[len(my_moves) - 2]


class Strategy:
    def next_move(self):
        pass


class GrungerStrategy:
    def __init__(self):
        self.is_random = False
        self.name = "grunger"
        self.toAvenge = False

    def next_move(self, my_moves, enemy_moves):
        if len(enemy_moves) == 0:
            return Move.CO_OPERATE
        if enemy_moves[len(enemy_moves) - 1] == Move.DEFECT:
            self.toAvenge = True
        if self.toAvenge:
            return Move.DEFECT
        return Move.CO_OPERATE


strat_dict = {"tit-for-tat": (lambda: type("Strategy", (Strategy, object),
                                           {"next_move": lambda my_moves, enemy_moves: Move.CO_OPERATE
                                           if len(enemy_moves) == 0 else enemy_moves[len(enemy_moves) - 1],
                                            "name": "tit-for-tat",
                                            "is_random": False})),
              "always-defect": (lambda: type("Strategy", (Strategy, object),
                                             {"next_move": (lambda my_moves, enemy_moves: Move.DEFECT),
                                              "name": "always-defect",
                                              "is_random": False})),
              "always-cooperate": (lambda: type("Strategy", (Strategy, object),
                                                {"next_move": (lambda my_moves, enemy_moves: Move.CO_OPERATE),
                                                 "name": "always-cooperate",
                                                 "is_random": False})),
              "alternating": (lambda: type("Strategy", (Strategy, object),
                                           {"next_move":
                                            (lambda my_moves, enemy_moves: alternating(my_moves, enemy_moves)),
                                           "name": "alternating",
                                            "is_random": False})),
              "grunger": (lambda: GrungerStrategy())}
