import _ from 'lodash';

export const dataToFlat = (data) => {

    //TODO iterate data and fill flat table
    const flat_data = [];
    const col_array = ['_index','_type', '_id'];
    for(let i in data) {
        let flat_row = {};
        let row = data[i];
        flat_row._index = row._index;
        flat_row._type = row._type;
        flat_row._id = row._id;
        for(let source_key in row._source) {
            flat_row[source_key] = row._source[source_key];
            if (!col_array.includes(source_key))
                col_array.push(source_key);
        }
        flat_data.push(flat_row);
    }

    return {
        data: flat_data,
        fields: col_array,
    };
}

