from flask import Flask, request
from flask_jsonpify import jsonify
from game import Match
from flask_cors import CORS

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
    print(type(data['strategies']))
    match = Match(data['strategies'])
    match.run()
    return jsonify({"scores": match.get_results()})


@app.route('/strategies')
def get_strategies():
    return jsonify({"message": ["tit-for-tat", "grunger"]})


# @app.after_request
# def after(response):
#     # todo with response
#     print("response for", request.method)
#     print(response.status)
#     print("headers:", response.headers)
#     print("data:", response.get_data())
#     print("end response for", request.method)
#     return response


if __name__ == '__main__':
    app.run(port=8080, debug=True)
