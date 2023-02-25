const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const apidocker = require("./routes/dockerroutes");

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin:["http://localhost:3000"], 
  credentials:true,
  optionsSuccessStatus: 200}));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000', 
'http://localhost:3000/patient/dashboard', 
'http://localhost:3000/login',
'http://localhost:3000/signup',
'http://localhost:3000/doctor/dashboard',
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
    console.log("Server started to listen...");
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
  