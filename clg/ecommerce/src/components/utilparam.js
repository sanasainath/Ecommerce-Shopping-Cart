const parseQueryString = (query) => {
    if (query) {
        const queryString = query.split("?")[1];
        if (queryString && queryString.length > 0) {
            const params = queryString.split("&");
            const paramObj = {};
            params.forEach(param => {
                const keyValue = param.split("=");
                paramObj[keyValue[0]] = keyValue[1];
            });
            return paramObj;
        }
    }
    return {};
};

export default parseQueryString;
