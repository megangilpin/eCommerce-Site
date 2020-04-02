const express = require("express"); 
const db = require("../db"); 

const router = express.Router()

router.get("/", async (req, res) => { 
    try { 
        await db.all(function(err, rows) { 
            if(err) { 
                console.log(err);
            }
            res.status(200).json(rows)
        });
    } catch(e) { 
        console.log(e);
    }
}); 

module.exports = router;