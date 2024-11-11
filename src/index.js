import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import {initmongo} from "./utils/helper-db.js";
import { router } from "./routers/router.js";
const init =()=>{
    try{
      console.log(1)
        initmongo()
        let PORT =5000 || 5001
        let app = express()
        app.use(bodyParser.json())
        app.use(
            cors({
              origin: "*",
              methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
            })
          );
          app.all("/*", function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
            res.header(
              "Access-Control-Allow-Headers",
              "Content-Type, Authorization, Content-Length, X-Requested-With"
            );
            res.header("Access-Control-Allow-Credentials", "true");
            next();
          });
      
          app.use("/srs/api", cors(), router);
          // app.get("/srs", (req, res) => {
          //   res.send("file running successfully");
          // });
      
          app.listen(PORT, () => {
            console.log(`🚀 Port is running Successfully in ${PORT}`);
          });
            
    }
    catch(err){
        console.error(err)
    }
}

init()