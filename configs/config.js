const env = 'development' // development / production

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
    HOST: 'ec2-52-204-157-26.compute-1.amazonaws.com',
    DATABASE: 'd66c7sfct6gjni',
    USERNAME: 'gomctzibjvdckc',
    PASSWORD: '138476c5e89eec70a8d509c989b7a01722352f22599b75ae39cd783189a859d5',
    SERVER_ENDPOINT: 'https://backend-express-aplicant-cv.herokuapp.com'   
}

if(env==='development'){
    module.exports = devConfig
}else if(env ==='production'){
    module.exports = prodConfig
}