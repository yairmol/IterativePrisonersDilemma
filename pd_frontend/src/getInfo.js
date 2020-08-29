const http = require('http');
const options = {
    host: '192.168.0.14',
    port: 80,
    path: '/match',
    method: 'GET'
};

let sessionData;
let games;
const constructed = false;


const getJ = (options, cb) => {
    return http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log(JSON.parse(body)));
        res.on('error', cb);
    })
        .on('error', cb)
        .end()
};


const construct = () => {
    sessionData = [
        {
            name: "covid",
            score: 650
        },
        {
            name: "yossi",
            score: 400
        },
        {
            name: "elaro",
            score: 783
        },
        {
            name: "yair",
            score: 860
        },
        {
            name: "george",
            score: 2000
        },
    ];
    games = [
        {
            player1name: "yossi",
            player2name: "avi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "woo",
            player2name: "yossi",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        },
        {
            player1name: "george",
            player2name: "what",
            player1score: 16,
            player2score: 20,
            player1moves: [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0
            ],
            player2moves: [
                1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0
            ]
        }
    ]
};


const getScores = () =>
    sessionData.map(o => ({label: o.name, y: o.score}));


const getGame = (i) =>
    games[i];

const axios = require("axios").default;
const getStratGames = (stratName, iteration) =>
    axios({
        method: 'get',
        url: "http://localhost:8080/gamesof/"+stratName+"/"+iteration,
    })
        .then((response) => {
            return response.data;
        })
        .catch(err => alert(err));
/*games.reduce((acc, curr) => curr.player1name == stratName || curr.player2name == stratName ?
                                  acc.concat([{name1: curr.player1name,
                                               name2: curr.player2name,
                                               score1: curr.player1score,
                                               score2: curr.player2score,
                                               index: games.indexOf(curr)
                                        }]) : acc, [])*/


exports.getScores = getScores;
exports.construct = construct;
exports.getGame = getGame;
exports.getStratGames = getStratGames;
