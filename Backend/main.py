from game import *
from strategies import strat_dict
import json


def main():
    move = Move.CO_OPERATE
    print(move == 0)
    print(move.value)
    # with open("game_configurations.json") as game_config_file:
    #     game_config = json.load(game_config_file)
    # game = Game(game_config["rounds"], Player(strat_dict["grunger"]()), Player(strat_dict["alternating"]()),
    #             game_config["c_c_score"], game_config["d_c_score"], game_config["d_d_score"])
    # game.start()


if __name__ == "__main__":
    main()
