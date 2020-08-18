from flask import Flask, request, abort
from flask_jsonpify import jsonify
from game import make_match as match
from game import games_of as games_of2
from flask_cors import CORS
from strategies import strat_dict, create_strategy, import_custom_strategies as imp_cstm_strat
import os
cwd = os.getcwd()
app = Flask(__name__)
CORS(app)
CORS(app, resources={
    r"/.*": {
        "origins": "*",
        "Content-Type": "application/json"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.before_first_request
def import_custom_strategies():
    imp_cstm_strat()


@app.route('/match', methods=['POST'])
def make_match():
    data = request.json
    print(data)
    # match = Match(data['strategies'])
    # match.run()
    # Match.last_match = match

    return jsonify(match(data['strategies'], data['rounds']))


@app.route('/strategies')
def get_strategies():
    return jsonify({"message": list(strat_dict.keys())})


@app.route('/gamesof/<strategy>')
def games_of(strategy):
    games = games_of2(strategy)
    return jsonify(games)


@app.route('/create_strategy', methods=['POST'])
def create_strategy_api():
    print("old:", cwd)
    print("new:", os.getcwd())
    data = request.json
    code = data['code']
    strategy_name = data['name']
    try:
        create_strategy(code, strategy_name)
    except Exception as e:
        abort(500, description=e)
    return jsonify("success")


@app.errorhandler(500)
def server_error(e):
    return jsonify(error=str(e)), 500


@app.after_request
def after(response):
    # todo with response
    print("response for", request.method)
    print(response.status)
    print("headers:", response.headers)
    print("data:", response.get_data())
    print("end response for", request.method)
    return response


if __name__ == '__main__':
    app.run(port=8080, debug=True)
