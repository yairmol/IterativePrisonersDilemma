from game import *
from strategies import strat_dict
import json
import os
import importlib
text = """from move import Move
from typing import List


class Strat:
    # startegy initialization method. add variables as you wish (for example a number_of_turns variable)
    def __init__(self):
        # implement
        # example: 
        self.number_of_turns = 0

    # the strategy's main function.
    # it calculates the next move, given the previous moves of herself and her opponent
    # it can also use any variables declared in the init function
    def next_move(self, my_moves: List[Move], enemy_moves: List[Move]) -> Move:
        # Move is an Enum with two values:
        #   Move.CO_OPERATE and Move.DEFECT
        # this function must return one of this value
        # the function params my_moves and enemy_moves are both lists
        # composed of this enum.
        # example:
        self.number_of_turns += 1
        if self.number_of_turns % 2 == 0:
            return Move.CO_OPERATE
        else:
            return Move.DEFECT"""
new_strategies_file = 'new_strategies.py'


def main():
    # with open(new_strategies_file, "w+") as strategies_file:
    #     strategies_file.write(f"\n{text}")
    # module = importlib.import_module('new_strategies.strategy_1')
    # print(module)
    # module = getattr(module, 'strategy_1')
    string = "abc.mod"
    print(string[:string.find('.')])
    # print(module.Strat)
    # with open("game_configurations.json") as game_config_file:
    #     game_config = json.load(game_config_file)
    # game = Game(game_config["rounds"], Player(strat_dict["grunger"]()), Player(strat_dict["alternating"]()),
    #             game_config["c_c_score"], game_config["d_c_score"], game_config["d_d_score"])
    # game.start()


if __name__ == "__main__":
    main()
