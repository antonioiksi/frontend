import React from 'react'
import PropTypes from 'prop-types'
import {Form, FormGroup, FormControl, ControlLabel, Button, Table, Panel} from 'react-bootstrap';


//const AttrTypes = [{name:'phone',title:'Телефон'},{name:'firstname', title:'Имя'}];


class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error:'',
            form: {
                selectValue:'',
                textValue:''
            },
            values:this.props.valuesProp
        }
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
                values:[...this.state.values,{name:this.state.form.selectValue,value:this.state.form.textValue}]
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
                <h1>Search Form {this.props.index}</h1>
                <Button  bsStyle="danger" onClick={() => this.handleRemoveForm()}>Remove form</Button>
                {this.state.error!==''?(
                    <Panel header="Ошибка" bsStyle="danger">
                        {this.state.error}
                    </Panel>):('')}
                <Form horizontal>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Attribute Name</ControlLabel>
                        <FormControl componentClass="select" placeholder="select" name="selectValue" onChange={this.handleChange.bind(this)}>
                            <option>-</option>
                            {AttrTypes.map((attr) =>
                                <option key={attr.name} value={attr.name}>
                                    {attr.title}
                                </option>
                            )}
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsText">
                        <ControlLabel>Value</ControlLabel>
                        <FormControl type="text" placeholder="Value" name="textValue" onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" name="HiSearch" onClick={this.handleAddFormValue.bind(this)}>
                            Add
                        </Button>
                    </FormGroup>
                </Form>


                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Value</th>
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
                                    <Button  bsStyle="danger" onClick={() => this.handleRemoveFormValue(i)}>Remove</Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>

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