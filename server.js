const express = require('express');
const app = express();

//Replace env port variable by this
const port = 443;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/', function (req, res){
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toGMTString()
  })
})

app.get("/api/:date", function (req, res) {
  let date = req.params.date;

  if ((/^\d+$/).test(date)){
    date = parseInt(date);
  }

  date = new Date(date)
  const response = {}

  if (date == "Invalid Date"){
    response.error = date.toString();
  } else {
    response.unix = date.getTime();
    response.utc = date.toGMTString();
  }

  res.json(response);
});

app.listen(process.env.PORT, ()=>{
  console.log(`Listening on ${process.env.PORT}`);
});
