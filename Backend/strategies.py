import importlib

from move import Move
import random
from typing import List
from os import listdir

new_strategies_file = 'strategy'
strategies_folder = 'new_strategies'
imports = "from typing import List\n" \
          "from move import Move"


def import_custom_strategies():
    for file in listdir('./new_strategies'):
        if file.find(new_strategies_file) == -1:
            continue
        strat_module = importlib.import_module(f"{strategies_folder}.{file[:file.find('.')]}")
        strategy = strat_module.NewStrategy()
        strat_dict[strategy.name] = strat_module.NewStrategy


def get_last_strategy() -> int:
    max_strategy = 0
    for file in listdir('./new_strategies'):
        if file.find(new_strategies_file) == -1:
            continue
        current_strategy_num = int(file[file.find('_') + 1:file.find('.')])
        max_strategy = max(max_strategy, current_strategy_num)
    return max_strategy


def validate_code(code: str) -> bool:
    class_name_ok = False
    has_init = False
    has_next_move = False
    for row in code.split('\n'):
        print(row)
        if class_name_ok and has_next_move and has_init:
            return True
        if row.find("class") != -1 and row.find("NewStrategy") != -1:
            class_name_ok = True
            print("class ok")
        if row.find('def') != -1 and row.find('__init__') != -1:
            print("init ok")
            has_init = True
        if row.find('def') != -1 and row.find('next_move') != -1:
            print("has next move ok")
            has_next_move = True
    return has_next_move and has_init and class_name_ok


def add_name(code: str, name: str) -> str:
    new_code = ""
    for row in code.split('\n'):
        new_code = new_code + "\n" + row
        if row.find('def') != -1 and row.find('__init__') != -1:
            spaces = ""
            for c in row:
                if c == ' ':
                    spaces = spaces + ' '
                else:
                    break
            spaces = spaces + '    '
            new_code = new_code + "\n" + spaces + "self.name = \"" + name + "\""
    return new_code


def create_strategy(code: str, strategy_name: str):
    if not validate_code(code):
        raise Exception("invalid class creation")
    code = add_name(code, strategy_name)
    last_strategy = get_last_strategy() + 1
    new_strategies_module_name = f"{strategies_folder}.{new_strategies_file}_{str(last_strategy)}"
    new_strategies_file_path = f"{strategies_folder}/{new_strategies_file}_{str(last_strategy)}.py"
    print(new_strategies_file_path)
    with open(new_strategies_file_path, "w+") as strategies_file:
        strategies_file.write(imports)
        strategies_file.write(f"\n{code}")
    try:
        new_strategies_module = importlib.import_module(new_strategies_module_name)
        new_strat = new_strategies_module.NewStrategy
        strat_dict[strategy_name] = new_strat
    except Exception as e:
        raise Exception(f"could not create a new strategy. reason: {e}")


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


# sample strategy:
class insert_startegy_name:
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
            return Move.DEFECT
