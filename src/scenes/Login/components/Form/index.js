import React from 'react';
import {Redirect} from 'react-router-dom';

import {Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, Button, Panel} from 'react-bootstrap';
import {obtain_jwt} from "../../../../services/auth";
import {login} from "../../../../services/session";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {strings} from "../../../../localization";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        //obtain_jwt( this, this.state.username, this.state.password);
        login(this.state.username, this.state.password);
    }

    render() {
        //console.log(this.props.errors);
        //console.log('kuku ' + JSON.stringify( this.props.errors));

        const {username, password} = this.state;

        return (

            <Form horizontal onSubmit={this.handleSubmit}>
                {
                    this.props.errors && this.props.errors.length >0 ? (
                        this.props.errors.map((item, index) =>
                            <Panel header="Error" bsStyle="danger" eventKey={index} key={index}>{item}</Panel>)
                    ) : ('')
                }

                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        {strings.username}
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text"
                                     placeholder={strings.username}
                                     onChange={this.handleChange}
                                     name="username"
                                     value={username}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        {strings.password}
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder={strings.password} name="password" value={password} onChange={this.handleChange} />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" name="Hi" onClick={this.handleSubmit}>
                            {strings.SignIn}
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

/*
const mapStateToProps = function(store) {
    return {
        userId: store.session.user.id,
        errors: store.alarms.messages,
    };
};*/

/*
const mapDispatchToProps = function(dispatch) {
    return {
        login: bindActionCreators(login, dispatch)
    };
};*/

export default LoginForm;
//export default connect(mapStateToProps)(LoginForm);
//export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);

//export default LoginForm;