const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

http = require("http");

const hostname = "localhost";
const port = 5000;
const app = express();

const nationRouter = require("./routes/nationRouter");
const playerRouter = require("./routes/playerRouter");

app.use("/nations", nationRouter);
app.use("/players", playerRouter);

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//---------------------------------nation--------------------------------------------
app.all("/nation", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  next();
});

app.get("/nations", (req, res, next) => {
  res.end(
    `Will add the nation ${req.body.name} with details ${req.body.description}`
  );
});

app.put("/nations", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /nations");
});

app.delete("/nation", (req, res, next) => {
  res.end("Deleting all nations");
});

app.get("/nations/:nationId", (req, res, next) => {
  res.end(`Will send details of the nation:${req.params.nationId}to ypu`);
});

app.post("/nations/:nationId", (req, res, next) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /nations/${req.params.nationId}`);
});

app.put("/nations/:nationId", (req, res, next) => {
  res.write(
    "Updating the nation" +
      req.body.name +
      "will details:" +
      req.body.description
  );
});

app.delete("/nations/:nationId", (req, res, next) => {
  res.end("Deleting nation:" + req.params.nationId);
});

// --------------------------------------------Layer---------------------------------------------------
app.all("/player", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  next();
});

app.get("/players", (req, res, next) => {
  res.end(
    `Will add the nation${req.body.name}with details${req.body.description}`
  );
});

app.put("/players", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /players");
});

app.delete("/player", (req, res, next) => {
  res.end("Deleting all players");
});

app.get("/players/:playerId", (req, res, next) => {
  res.end(`Will send details of the player:${req.params.nationId} to you`);
});

app.post("/players/:playerId", (req, res, next) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /players/${req.params.playerId}`);
});

app.put("/players/:playerId", (req, res, next) => {
  res.write(
    `Updating the nation ${req.body.name}

      will details:${req.body.description}
     `
  );
});

app.delete("/players/:playerId", (req, res, next) => {
  res.end("Deleting player:" + req.params.playerId);
});

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
