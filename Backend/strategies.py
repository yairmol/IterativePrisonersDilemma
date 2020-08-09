from move import Move
import random


class Joss:
    def __init__(self, prob):
        self.prob_to_defect = prob
        self.name = "Joss"
        self.is_random = True

    def next_move(self, my_moves, enemy_moves):
        return Move.DEFECT if random.uniform(0, 1) <= self.prob_to_defect else tit_for_tat(my_moves, enemy_moves)


class RandomStrategy:
    def __init__(self, prob):
        self.prob_to_coop = prob
        self.name = "choose-randomly"
        self.is_random = True

    def next_move(self, my_moves, enemy_moves):
        return Move.CO_OPERATE if random.uniform(0, 1) <= self.prob_to_coop else Move.DEFECT


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


def tit_for_tat(my_moves, enemy_moves):
    return Move.CO_OPERATE if len(enemy_moves) == 0 else enemy_moves[len(enemy_moves) - 1]


class Strategy:
    def next_move(self):
        pass


class GrudgerStrategy:
    def __init__(self):
        self.is_random = False
        self.name = "grudger"
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
                                           {"next_move": tit_for_tat,
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
              "grudger": (lambda: GrudgerStrategy()),
              "choose-randomly": (lambda: RandomStrategy(0.5)),
              "Joss": (lambda: Joss(0.25))
              }
