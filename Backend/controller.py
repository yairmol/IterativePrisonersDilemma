from flask import Flask, request
from flask_jsonpify import jsonify
from game import make_match as match
from game import games_of as games_of2
from flask_cors import CORS
from strategies import strat_dict

app = Flask(__name__)
CORS(app)
CORS(app, resources={
    r"/.*": {
        "origins": "*",
        "Content-Type": "application/json"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/match', methods=['POST'])
def make_match():
    data = request.json
    # match = Match(data['strategies'])
    # match.run()
    # Match.last_match = match

    return jsonify(match(data['strategies'], 20))


@app.route('/strategies')
def get_strategies():
    return jsonify({"message": list(strat_dict.keys())})


@app.route('/gamesof/<strategy>')
def games_of(strategy):
    games = games_of2(strategy)
    return jsonify(games)


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
