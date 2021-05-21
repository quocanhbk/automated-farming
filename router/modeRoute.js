let express = require('express')
let router = express.Router();
const {dbConn} = require('./connection')


router.post('/',(req,res) =>{
    let m = `SELECT smode FROM mainsystem WHERE id = 101`;
    dbConn.query(m,function(err,result1){
        if(err) res.json({error: err})
        else{
            let mode = result1[0]["smode"]
            let p = `UPDATE mainsystem SET smode = ${!mode} WHERE id = 101`;
            dbConn.query(p,function(err, result2) {
            if (err) res.json({error: err})
            else{
                let num = mode == 1?"manual":"auto"
                res.status(200).json({"mode": num})
                }
            })
        }
    })
}) 

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