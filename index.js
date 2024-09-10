const app = require('express')();
const axios = require('axios');
var bodyParser = require('body-parser');
require('dotenv').config();

const host = process.env.IP;
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))

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

    return response.data;
  } catch (error) {
    return error.response.body;
  }
};

app.get('/login/:token', async (req, res) => {
  console.log(req.params.token);
  const token = req.params.token;
  const sid = await login(token);

  res.send(sid);
});

app.post('/report', async function (req, res) {
  const items = await sendPost(req.body);
  res.send(items);
});

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});