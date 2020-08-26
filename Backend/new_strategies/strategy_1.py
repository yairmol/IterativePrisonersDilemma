from typing import List
from move import Move

# don't change the name of this class
class NewStrategy:
    # strategy initialization method. add variables as you wish (for example a number_of_turns variable)
    def __init__(self):
        self.name = "yair"
        # this field is mandatory! its value is True if the strategy has randomized elements
        self.is_random = False
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