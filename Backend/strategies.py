from move import Move


def find_strategy(strategy):
    """return a strategy given the strategy name"""
    strategy_factory = strat_dict[strategy]
    print("type of strategy factory", type(strategy_factory))
    strategy_object = strategy_factory()
    print("type of strategy object", type(strategy_object))
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
                                            "name": "tit-for-tat"})),
              "always-defect": (lambda: type("Strategy", (Strategy, object),
                                             {"next_move": (lambda my_moves, enemy_moves: Move.DEFECT),
                                              "name": "always-defect"})),
              "always-cooperate": (lambda: type("Strategy", (Strategy, object),
                                                {"next_move": (lambda my_moves, enemy_moves: Move.CO_OPERATE),
                                                 "name": "always-cooperate"})),
              "alternating": (lambda: type("Strategy", (Strategy, object),
                                           {"next_move":
                                            (lambda my_moves, enemy_moves: alternating(my_moves, enemy_moves)),
                                           "name": "alternating"})),
              "grunger": (lambda: GrungerStrategy())}
