const express = require("express");
const app = express();

// Included so FCC test suite can access API.
const cors = require('cors');
app.use(cors());

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: Date()
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let date = req.params.date_string;
  
  var regex = /\d{5,}/;
  
  if(regex.test(date)) {
    let dateParsed = parseInt(date);
    res.json({
      unix: date,
      utc: new Date(dateParsed).toUTCString()
    });
  }
  
  var dateObj = new Date(date);
  
  if(dateObj.toString() === "Invalid Date") {
    res.json({ 
      error: "Invalid Date" 
    });
    return;
  } else {
    res.json({ 
      unix: dateObj.valueOf(), 
      utc: dateObj.toUTCString() 
    });
  }
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 5000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
