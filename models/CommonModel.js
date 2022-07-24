const Response = (errorCode, errorDesc, data) => {
    return {
        errorCode,
        errorDesc,
        data
    }
} 

const ResponseOpenAPI = (header, data) => {
    return {header, data};
}

const HeaderOpenAPI = (code, message) => {
    return {code, message};
}

const ReplenishHeader = (id_user, organization_id) => {
    return {id_user, organization_id}
};

module.exports = {
    Response, ResponseOpenAPI, HeaderOpenAPI, ReplenishHeader
}