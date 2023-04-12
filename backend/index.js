const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const apidocker = require("./routes/apirequests");
const usageserver = require("./routes/docker/usageserver");

const port = 5000;
const app = express();

usageserver.startserver();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin:["http://localhost:3000"], 
  credentials:true,
  optionsSuccessStatus: 200}));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000', 
'http://localhost:3000/api', 
];

app.use((req,res,next)=>{
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
});
  
app.listen(port, () => {
    console.log("Server Started to listen on port 5000...");
});

async function validateCookiesfunc (req, res, next) {
    req.userid = jwt.getjwt(req, res);
    if(req.userid === undefined){
      return
    }
    next()
}

// app.use(validateCookiesfunc);

app.get("/", function (req, res) {
    res.send("This is a development server");
});

app.use("/api",apidocker);

app.get('*', function(req, res){
res.sendStatus(404)
});
  