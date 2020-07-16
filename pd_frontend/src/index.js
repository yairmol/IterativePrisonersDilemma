import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameConfig from "./GameConfig";
import Dashboard from "./template/Dashborad";

// class App extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             msg: "yair"
//         }
//     }
//
//     componentDidMount() {
//         const axios = require("axios").default;
//
//         const func = () => axios({
//             method: 'get',
//             url: "http://localhost:8080/strategies",
//         }).then((response) => alert(JSON.stringify(response.data)))
//             .catch(err => alert(err));
//
//         func();
//     }
//
//     render(){
//         return <div>hello world! {this.state.msg}</div>
//     }
// }

ReactDOM.render(<Dashboard />, document.getElementById('root'));
