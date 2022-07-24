const env = 'development'

const devConfig={
    PORT:'5000',
    JWT_SECRET: "t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G",
    HOST: 'localhost',
    DATABASE: 'greatdayhr_db',
    USERNAME: 'postgres',
    PASSWORD: 'umn123',
    SERVER_ENDPOINT: 'http://localhost:5000'   
}

const prodConfig={
    PORT:'5005',
    JWT_SECRET: "t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G",
    HOST: 'localhost',
    DATABASE: 'greatdayhr_db',
    USERNAME: 'postgres',
    PASSWORD: 'umn123',
    SERVER_ENDPOINT: 'http://localhost:5005'   
}

if(env==='development'){
    module.exports = devConfig
}else if(env ==='production'){
    module.exports = prodConfig
}