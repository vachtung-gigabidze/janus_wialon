const app = require('express')();
const axios = require('axios');
var bodyParser = require('body-parser')

const host = '172.17.10.4';
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }))

//app.use(bodyParser.json())

async function login(token) {
  try {
    const response = await axios.get(`https://hst-api.org.sputnik.vision/wialon/ajax.html?svc=token/login&params={"token":"${token}"}`);
    //console.log(response.data.eid);
    return response.data;
  } catch (error) {
    return error.response.body;
  }
};

async function sendPost(bodyFormData) {
  try {
    const response = await axios({
      method: "post",
      url: "https://hst-api.org.sputnik.vision/wialon/ajax.html",
      data: bodyFormData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    // .post(`https://hst-api.org.sputnik.vision/wialon/ajax.html`);
    //console.log(response.data.items);
    return response.data;
  } catch (error) {
    return error.response.body;
  }
};

app.get('/login/:token', async (req, res) => {
  console.log(req.params.token);
  const token = req.params.token;
  const sid = await login(token);
  //console.log(data);
  res.send(sid);
});

app.post('/report', async function (req, res) {
  // console.log("get");
  const items = await sendPost(req.body);
  // console.log(items[0]);
  // console.log("items");
  res.send(items);
});

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});