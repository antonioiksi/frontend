import _ from 'lodash';
import format from 'string-format';
import store from "../../store";

const query_body = {
    query: {
        bool: {
            should: []
        }
    },
    /*
    highlight : {
        encoder: 'html',
        fields : {
            comment : {}
        }
    }*/
}
const query_string_default = {
    default: {
        query_string: {
            default_field: "*{0}*",
            query: "{0}",
        }
    },
    phone: {
        query_string: {
            default_field: "*{0}*",
            query: "{0}~2",
            analyzer: "whitespace",
            lenient: true,
        }
    },
    address: {
        query_string: {
            default_field: "*{}*",
            query: "{}",
            analyze_wildcard: true,
            lenient: true,
            fuzziness: 3,
        }
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


export function prepare_q2( jsonQuery, entityAttributeMapping) {
    let fields = [];

    let queryItems = [];

    const settings = store.getState().settings;

    let query_string = settings.field_query_string.setting;
    if (!query_string)
        query_string = query_string_default;


    Object.keys(jsonQuery).forEach((key) => {
        let value = jsonQuery[key];

        let attr_mapping = _.findLast( entityAttributeMapping, {name:key});
        let attr_names = [];
        if (attr_mapping!=undefined)
            attr_names = attr_mapping.attr_names;
        else
            attr_names.push(key);

        attr_names.forEach((currentValue, index) => {

            fields.push("*"+currentValue+"*");

            var queryString = null;
            if (currentValue.indexOf("phone")>-1) {
                queryString=JSON.parse(JSON.stringify(query_string.phone));
            } else if (currentValue.indexOf("address")>-1) {
                queryString=JSON.parse(JSON.stringify(query_string.address));
                //TODO using regexp to add '+' for every word in string
                value = value.replace(/(\w+)/g,"+$1");
            } else {
                queryString=JSON.parse(JSON.stringify(query_string.default));
            }
            queryString.query_string.default_field = format(queryString.query_string.default_field, currentValue);
            queryString.query_string.query = format( queryString.query_string.query, value);
            //let values = {};
            //let item = {};
            //item.default_field = "*"+key+"*";
            //item.query = jsonQuery[key];
            queryItems.push(queryString);

        });
    });

    let queryBody = JSON.parse(JSON.stringify(query_body));
    queryBody.query.bool.should = queryItems;
    if(queryBody.highlight) {
        queryBody.highlight.fields = {[fields[0]]:{}};
    }



    //console.log(queryBody);
    return queryBody;

}