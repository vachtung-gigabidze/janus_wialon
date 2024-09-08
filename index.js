const app = require('express')();
const axios = require('axios');

const host = '127.0.0.1';
const port = 8000;

async function login(token) {
    try {        
        const response = await axios.get(`https://hst-api.org.sputnik.vision/wialon/ajax.html?svc=token/login&params={"token":"${token}"}`);
        //console.log(response.data.eid);
        return {sid: response.data.eid};
      } catch (error) {
        return error.response.body;
      }  
};

app.get('/login/:token', async (req, res) => {
    console.log(req.params.token);
    const token = req.params.token;
    const sid = await login(token);
    //console.log(data);
    res.json(sid);    
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});




