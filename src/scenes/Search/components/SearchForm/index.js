import React from 'react'
import PropTypes from 'prop-types'
import {Form, FormGroup, FormControl, ControlLabel, Button, Table, Panel, Col} from 'react-bootstrap';
import SearchFormEditTable from "../SearchFormEditTable";
import {strings} from "../../../../localization";


//const AttrTypes = [{name:'phone',title:'Телефон'},{name:'firstname', title:'Имя'}];


class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error:'',
            form: {
                selectTextValue:'',
                selectValue:'',
                textValue:''
            },
            values:this.props.valuesProp
        }
    }

    handleSelectChange(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;

        this.setState({form: {...this.state.form, [fieldName]: fleldVal, selectTextValue: fleldVal}},
            ()=>(console.log(this.state.form.textValue)));
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({form: {...this.state.form, [fieldName]: fleldVal}},
            ()=>(console.log(this.state.form.textValue)));
    }

    handleRemoveForm() {
        this.props.removeForm(this.props.index);
    }

    handleAddFormValue(event) {
        event.preventDefault();
        this.setState({
                values:[...this.state.values,{name:this.state.form.selectTextValue,value:this.state.form.textValue}]
            },() => {this.props.changeFormValues(this.props.index, this.state.values)}
        );
    }

    handleRemoveFormValue(removeId) {
        this.setState({
                values: this.state.values.filter((_,i) => i !== removeId)
            },
            () => {this.props.changeFormValues(this.props.index, this.state.values)}
        );
    }


    render() {
        const values = this.state.values;
        const AttrTypes = this.props.attrTypes;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.SearchForm} #{this.props.index+1} (<Button  bsStyle="danger" bsSize="small" onClick={() => this.handleRemoveForm()}>{strings.RemoveForm}</Button>)</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    {this.state.error!==''?(
                        <Panel header="Ошибка" bsStyle="danger">
                            {this.state.error}
                        </Panel>):('')}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <Form horizontal>
                            <Col sm={5} >
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>{strings.AttributeName}</ControlLabel>
                                    <FormControl type="text" placeholder={strings.AttributeName} name="selectTextValue" value={this.state.form.selectTextValue} onChange={this.handleChange.bind(this)}/>
                                    <FormControl componentClass="select" placeholder="select" name="selectValue" onChange={this.handleSelectChange.bind(this)}>
                                        <option>-</option>
                                        {AttrTypes.map((attr) =>
                                            <option key={attr.name} value={attr.name}>
                                                {attr.title}
                                            </option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col sm={6} smOffset={1} >
                                <FormGroup controlId="formControlsText">
                                    <ControlLabel>{strings.Value}</ControlLabel>
                                    <FormControl type="text" placeholder={strings.Value} name="textValue" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                            </Col>
                            <Col sm={2} smOffset={7}>
                                <FormGroup>
                                    <Button type="submit" bsSize="small" name="Add" onClick={this.handleAddFormValue.bind(this)}>
                                        {strings.AddAttribute}
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Form>
                    </div>
                    <div className="col-lg-8">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Value}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                values.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.value}</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.handleRemoveFormValue(i)}>Remove</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                        <SearchFormEditTable/>
                    </div>
                </div>
            </div>
        )
    }

};


SearchForm.PropTypes = {
    index: PropTypes.string,
    attrTypes: PropTypes.array,
    removeForm: PropTypes.func,
    valuesProp: PropTypes.array,
    changeFormValues: PropTypes.func,
};


export default SearchForm;