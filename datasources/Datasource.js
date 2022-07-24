//Database
const {cvPG}=require('../configs/cvPGDB')

//Datasource
const CVDatasource = require('./CVDatasource');

//Initiate Database
const cvPGDB =cvPG();

const Datasource = () => ({
    CVDatasource : new CVDatasource({cvPGDB})
})

module.exports = Datasource;