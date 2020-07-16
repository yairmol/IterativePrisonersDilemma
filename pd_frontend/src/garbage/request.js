const axios = require("axios").default;

const func = () => axios({
    method: 'get',
    url: "http://localhost:8080/strategies",
}).then((response) => console.log(response.data));
// .then(res => console.log(res.data))

func();