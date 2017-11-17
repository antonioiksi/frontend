const q1_body = {
    query: {
        bool: {
            should: []
        }
    }
}
const q1_item =
    {
        query_string: {
            default_field: "*speaker*",
            query: "KING"
        }
    }

export function prepare_q1( jsonQuery) {

    const queryItems = [];
    jsonQuery.forEach(
        function (query) {
            const values = [];
            Object.keys(query).forEach(
                function(key) {
                    const item = Object.assign({},q1_item);
                    item.query_string.default_field = "*"+key+"*";
                    item.query_string.query = query[key];
                    //{"name":key, "value":query[key]};
                    values.push(item);
                }
            );
            queryItems.push(values);
        }
    );
    const queryBody = Object.assign({}, q1_body);
    queryBody.query.bool.should = queryItems;
    console.log(queryBody);
    return queryBody;

}