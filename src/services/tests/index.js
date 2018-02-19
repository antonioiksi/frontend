import axios from 'axios';
import {BUSINESS_SERVER_URL} from "../constants";

export function test_drf(sender) {
    axios.get(BUSINESS_SERVER_URL+'/tests/drf/')
        .then(({data}) => {
            sender.setState(prevState => ({
                tests: {
                    ...prevState.tests,
                    drf: {checked: true, success: true, fetching:false}
                }
            }));
        })
        .catch( ( error ) => {
            sender.setState(prevState => ({
                tests: {
                    ...prevState.tests,
                    drf: {checked: true, success: false, fetching:false, error: "drf error" + JSON.stringify(error.message)}
                }
            }));
        });
}


export function test_drf_postgres(sender) {
    axios.get(BUSINESS_SERVER_URL+'/tests/drf-postgres/')
        .then(({data}) => {
            sender.setState(prevState => ({
                tests: {
                    ...prevState.tests,
                    drf_postgres: {checked: true, success: true, fetching:false}
                }
            }));
        })
        .catch( ( error ) => {
            sender.setState(prevState => ({
                tests: {
                    ...prevState.tests,
                    drf_postgres: {checked: true, success: false, fetching:false, error: "drf-postgres error" +JSON.stringify(error.message)}
                }
            }));
        });
}


export function test_drf_es(sender) {
    axios.get(BUSINESS_SERVER_URL+'/tests/drf-es/')
        .then(({data}) => {
            sender.setState(prevState => ({
                tests: {
                    ...prevState.tests,
                    drf_es: {checked: true, success: true, fetching:false}
                }
            }));
        })
        .catch( ( error ) => {
            sender.setState(prevState => ({
                tests: {
                    ...prevState.tests,
                    drf_es: {checked: true, success: false, fetching:false, error: "drf-es error" + JSON.stringify(error.message)}
                }
            }));
        });
}



