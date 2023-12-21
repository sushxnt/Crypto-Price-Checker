//Importing Required Modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


//Create express and set port
const app=express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: true }));

//Public Folder for static files
app.use(express.static("public"));

//API URL
const API_URL="https://api.blockchain.com/v3/exchange/tickers/";


//

app.get("/",async(req,res)=>{
    res.render("index.ejs");
});

app.post("/get-price",async(req,res)=>{
    try {
       let symbol=req.body.symbol;
       let symbolUpper=symbol.toUpperCase();
       

        console.log(symbolUpper);
        const result=await axios.get(API_URL +symbolUpper );
        res.render("index.ejs",{ltp:result.data.last_trade_price,symbol:result.data.symbol,vol24hr:result.data.volume_24h});
    }
    catch(error){
        res.status(400).send(error.message);

    }
});





//Listening on port 
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

