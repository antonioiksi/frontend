import React,{Component} from 'react';
import {ScaleLoader, PulseLoader} from "react-spinners";
import elastic from './img/elastic.svg';
import postgres from './img/postgres.svg';
import python from './img/python.svg';
import laptop from './img/laptop-yellow.svg';
import arrow from './img/double-angle-pointing-to-right.svg';
import './style.css';
import {test_drf, test_drf_postgres, test_drf_es} from "../../../../../../services/tests";
import {Alert, Button, ButtonToolbar, Label, Modal, ProgressBar} from "react-bootstrap";
import {Redirect} from "react-router-dom";

const tests = []

class RedirectTimer extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date:new Date(),
            elapsed: 0,

        };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            this.props.refreshtimeinmillisec
        );
    }
    componentWillUnMount() {
        clearInterval(this.timerID);
    }
    tick() {

        this.setState({
            date: new Date(),
            elapsed: new Date() - this.props.start
        });
    }
    render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        var elapsed_sec = Math.round(this.state.elapsed / 1000);
        var seconds = (elapsed / 10).toFixed(1);
        var remains = (this.props.stop + 1 - elapsed_sec).toFixed(1);
        var remainsProc = (elapsed_sec*100/this.props.stop);

        if (seconds > this.props.stop)
            return <Redirect to="/login/"/>;

        return(
            <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                <h1>{this.state.date.toLocaleTimeString()}</h1>
                <h4 className="text-center">Все тесты пройдены успешно!</h4>
                <div className="text-center">Нажмите start для начала работы или дождитесь автоматического перехода на страницу авторизации</div>
                <div className="text-right">
                    <h1 bsStyle="warning">через <Label bsStyle="warning">{elapsed_sec}</Label> секунд</h1>
                </div>
                <ProgressBar bsStyle="warning" active now={remainsProc} />
            </Alert>
        )
    }

}



class Trigger extends React.Component{
    constructor(props) {
        super(props)
        this.state = { show: false };
    }

    render() {
        let close = () => this.setState({ show: false });

        return (
            <div className="modal-container" style={{ height: 200 }}>
                <Button
                    bsStyle="danger"
                    bsSize="xsmall"
                    onClick={() => this.setState({ show: true })}
                >
                    Error
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-left">
                        {this.props.error}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


class TestDRF extends Component {
    constructor(props) {
        super(props);

        this.state = {

            redirectLogin: false,
            showModal: false,
            tests: {
                drf: {
                    title: "DRF",
                    checked: false,
                    fetching: true,
                    success: false,
                    error: '',
                },
                drf_postgres: {
                    title: "DRF-postgres",
                    checked: false,
                    fetching: true,
                    success: false,
                    error: ''
                },
                drf_es: {
                    title: "DRF-es",
                    checked: false,
                    fetching: true,
                    success: false,
                    error: '',
                }
            }
        }
    }


    componentWillMount() {
        if (!this.state.tests.drf.success) {
            test_drf(this);
        }
    }


    fetchingState(test) {
        switch(test.fetching) {
            case false:
                return (<i class="fa fa-handshake-o fa-5x" aria-hidden="true"></i>);
            case true:
                return (
                    /*<i class="fa fa-question-circle fa-5x" aria-hidden="true"></i>*/
                    <ScaleLoader
                        color={'#36D7B7'}
                        loading={test.fetching}
                    />
                );
        }
    }

    checkingState( test) {
        switch(test.success) {
            case false:
                return (<i class="fa fa-ban fa-5x" aria-hidden="true"></i>);
            case true:
                return (
                    /*<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>*/
                    <i class="fa fa-check-circle fa-5x" aria-hidden="true"></i>
                );
            default:
                return (<i class="fa fa-question-circle fa-5x" aria-hidden="true"></i>);
        }
    }


    checkSuccessTests(tests) {
        let resultSuccess = null;
        Object.keys(tests).map( (key) => {
                if(tests[key].checked) {
                    if(tests[key].success) {
                        resultSuccess = true;
                    } else {
                        resultSuccess = false;
                        return "";
                    }
                }
                else {
                    resultSuccess = null;
                }
            }
        )
        return resultSuccess;
    }

    render() {

        if(this.state.redirectLogin === true)
            return <Redirect to="/login/"/>;

        if (this.state.tests.drf.success) {
            if(!this.state.tests.drf_postgres.checked) {
                test_drf_postgres(this);
            }
            if(!this.state.tests.drf_es.checked) {
                test_drf_es(this);
            }
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 text-center">
                        <img src={laptop} className="laptop picture" alt="laptop" />
                    </div>
                    <div className="col-lg-2 text-center">
                        {this.fetchingState(this.state.tests.drf)}
                    </div>
                    <div className="col-lg-2 text-center">
                        <img src={python} className="python picture" alt="python-logo" />
                    </div>
                    <div className="col-lg-5 text-right">
                        {
                            this.state.tests.drf.error ? (
                                <Trigger error={this.state.tests.drf.error}/>
                            ) : ('')
                        }
                    </div>
                    <div className="col-lg-1 text-right">
                        {this.checkingState(this.state.tests.drf)}
                    </div>
                </div>
                {
                    this.state.tests.drf.success ? (
                        <div className="row">
                            <div className="col-lg-2 text-center">
                                <img src={laptop} className="laptop picture" alt="laptop" />
                            </div>
                            <div className="col-lg-2 text-center">
                                {this.fetchingState(this.state.tests.drf_postgres)}
                            </div>
                            <div className="col-lg-2 text-center">
                                <img src={python} className="python picture" alt="python-logo" />
                            </div>
                            <div className="col-lg-2 text-center">
                                {this.fetchingState(this.state.tests.drf_postgres)}
                            </div>
                            <div className="col-lg-2 text-center">
                                <img src={postgres} className="postgres picture" alt="postgres-logo" />
                            </div>
                            <div className="col-lg-1 text-right">
                                {
                                    this.state.tests.drf_postgres.error ? (
                                        <Trigger error={this.state.tests.drf_postgres.error}/>
                                    ) : ('')
                                }
                            </div>
                            <div className="col-lg-1 text-right">
                                {this.checkingState(this.state.tests.drf_postgres)}
                            </div>
                        </div>
                    ) : ('')
                }
                {
                    this.state.tests.drf.success ? (
                        <div className="row">
                            <div className="col-lg-2 text-center">
                                <img src={laptop} className="laptop picture" alt="laptop" />
                            </div>
                            <div className="col-lg-2 text-center">
                                {this.fetchingState(this.state.tests.drf_es)}
                            </div>
                            <div className="col-lg-2 text-center">
                                <img src={python} className="python picture" alt="python-logo" />
                            </div>
                            <div className="col-lg-2 text-center">
                                {this.fetchingState(this.state.tests.drf_es)}
                            </div>
                            <div className="col-lg-2 text-center">
                                <img src={elastic} className="elastic picture" alt="elastic-logo" />
                            </div>
                            <div className="col-lg-1 text-right">
                                {
                                    this.state.tests.drf_es.error ? (
                                        <Trigger error={this.state.tests.drf_es.error}/>
                                    ) : ('')
                                }
                            </div>
                            <div className="col-lg-1 text-right">
                                {this.checkingState(this.state.tests.drf_es)}
                            </div>
                        </div>
                    ): ('')
                }
                {this.checkSuccessTests(this.state.tests)? (
                    <div className="row">
                        <div className="col-lg-12">
                            <RedirectTimer start={Date.now()} stop={5}/>
                        </div>
                    </div>
                ) : ('')}
                <div className="row">
                    <div className="col-lg-12 text-center">
                        {
                            this.checkSuccessTests(this.state.tests)? (
                                <Button bsStyle="info" bsSize="large" onClick={() => {this.setState({redirectLogin:true})}}>Start</Button>
                            ):(
                                <Button bsStyle="info" bsSize="large" disabled>Start</Button>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default TestDRF;