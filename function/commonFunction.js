// output array
exports.DoQuery = (database, sql, bind) => {    
    return database.sequelize
        .query(
            sql, {
                bind : bind,
                raw : true
            }
        ).then(
            async ([results, metadata]) => {
                return [0, results, metadata]
            }
        ).catch(
            function(err){
                return [1, err, null]
            }
        )
}

// output non array
exports.DoQueryNonArray = (database, sql, bind) => {
    return database.sequelize
        .query(
            sql, {
                bind : bind,
                raw : true
            }
        ).then(
            async ([results, metadata]) => {
                return [0, results[0], metadata]
            }
        ).catch(
            function(err){
                return [1, err, null]
            }
        )
}


// Query Transaction array
exports.DoTransactionQuery = (database, sql, bind, t) => {    
    return database.sequelize
        .query(
            sql, {
                bind : bind,
                raw : true,
                transaction : t
            }
        ).then(
            async ([results, metadata]) => {
                return [0, results, metadata]
            }
        ).catch(
            function(err){
                return [1, err, null]
            }
        )
}

// Query Transaction non array
exports.DoTransactionQueryNonArray = (database, sql, bind, t) => {
    return database.sequelize
        .query(
            sql, {
                bind : bind,
                raw : true,
                transaction : t
            }
        ).then(
            async ([results, metadata]) => {
                return [0, results[0], metadata]
            }
        ).catch(
            function(err){
                return [1, err, null]
            }
        )
}
