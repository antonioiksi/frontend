/*
{
    "query":{
        "bool":{
            "should":[
                {
                    "query_string":{
                        "default_field":"*speaker*",
                        "query":"king"
                    }
                },
                {
                    "query_string":{
                        "default_field":"*play_name*",
                        "query":"Henry"
                    }
                }
            ]
        }
    }
}

*/

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
    let queryItems = [];

    Object.keys(jsonQuery).forEach(
        function(key) {
            let values = {};
            let item = {};
            item.default_field = "*"+key+"*";
            item.query = jsonQuery[key];
            values.query_string = item;
            queryItems.push(values);
        }
    );

    //let queryBody = Object.assign({}, q1_body);
    let queryBody = {
        query: {
            bool: {
                should: []
            }
        }
    };

    queryBody.query.bool.should = queryItems;
    //console.log(queryBody);
    return queryBody;

}