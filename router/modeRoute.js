let express = require('express')
let router = express.Router();
const {dbConn} = require('../connection')

//smode = 1 => auto otherwise manual

router.post('/',(req,res) =>{
    let query = `SELECT smode FROM mainsystem WHERE id = 101`;
    dbConn.query(query , (err, result) => {
        if(err) res.json({error: err})

        let newMode = result[0].smode === 0 ? 1 : 0
        let p = `UPDATE mainsystem SET smode = ${newMode} WHERE id = 101`;
        
        dbConn.query(p,function(err, result) {
            if (err) res.json({error: err})
            console.log(result)
            res.status(200).json({"mode": newMode === 1 ? "auto" : "manual"})
        })

    })
}) 

router.get('/', (req, res) => { 
    let m = `SELECT smode FROM mainsystem WHERE id = 101`;
    dbConn.query(m,function(err, result){
        if (err) res.json({error: err})
        console.log(result)
        let mode = result[0]["smode"] == 1 ? "auto":"manual"
        res.status(200).json({mode})
    })

})

module.exports = router;