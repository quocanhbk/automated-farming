var express = require('express')
var router = express.Router();
const {dbConn} = require('../connection')

router.post('/',(req,res) =>{
    let mode = req.body.mode
    var num =  mode == "auto"?1:0
        
        let p = `UPDATE mainsystem SET smode = ${num} WHERE id = 101`;
        dbConn.query(p,function(err, result) {
            if (err) res.json({error: err})
            else res.status(200).json({status: "success"})
        
        })
    
}
)

router.get('/', (req, res) => { 
    let m = `SELECT smode FROM mainsystem WHERE id = 101`;
    dbConn.query(m,function(err, result){
         if (err) res.json({error: err})
         else { 
            let mode = result[0]["smode"] == 1 ? "auto":"manual"
            res.status(200).json({"mode": mode})
         }
     })

})

module.exports = router;