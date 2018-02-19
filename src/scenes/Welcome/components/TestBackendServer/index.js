import React,{Component} from 'react';
import TestDRF from "./components/TestDRF/index";
import TestESviaDRF from "./components/TestESviaDRF/index";

class TestBackendServer extends Component {
    render() {
        return (
            <div>
                <TestDRF/>
                <TestESviaDRF/>
            </div>
        )
    }
}

export default TestBackendServer;