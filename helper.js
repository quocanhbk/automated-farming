module.exports.query = async (dbConn, queryCommand) => {
    return new Promise((resolve, reject) => {
        dbConn.query(queryCommand, (error, result) => {
            if (error) {
                reject(error)
                return
            }
            else resolve(result)
        })
    })
}