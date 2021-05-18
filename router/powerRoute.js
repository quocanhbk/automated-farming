var express = require('express')
var router = express.Router();
const {dbConn} = require('../connection')

router.post('/',(req,res) =>{
    let power = req.body.power
    var num =  power == "on"?1:0
        
        let p = `UPDATE mainsystem SET sstatus = ${num} WHERE id = 101`;
        dbConn.query(p,function(err, result) {
            if (err) res.json({error: err})
            else res.status(200).json({status: "success"})
        })
    
}
)
router.get('/', (req, res) => { 
    let q = `SELECT sstatus FROM mainsystem WHERE id = 101`;
    dbConn.query(q,function(err, result){
         if (err) res.json({error: err})
         else { 
            let power = result[0]["sstatus"] == 1 ? "on":"off"
            res.status(200).json({"power": power})
         }
     })

})
module.exports = router;
