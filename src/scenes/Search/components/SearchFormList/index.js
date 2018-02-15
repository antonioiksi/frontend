import React from 'react'
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";

import SearchForm from "../SearchForm";
import SearchTable from "../SearchTable";
import {strings} from "../../../../localization";




//const initQueryValues = [];//[{name:'phone',value:'43523452'},{name:'firstname', value:'Petrov'}];


class SearchFormList extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            formsValues: this.props.formsValuesProp
        }
    }

    changeFormValues(indexForm, newValues) {
        //console.log("changeFormValues="+indexForm);
        //console.log(newValues);

        const newFormsValues = [
            ...this.state.formsValues.slice(0, indexForm),
            newValues,
            ...this.state.formsValues.slice(indexForm + 1)
        ];
        this.setState(
            {formsValues: newFormsValues}
        );

    }

    handleAddForm(event) {
        this.setState({formsValues:[...this.state.formsValues,[]]});
    }

    removeForm(removeId) {
        //console.log(removeId);
        this.setState({
            formsValues: this.state.formsValues.filter((_,i) => i !== removeId)
        });
    }

    addFormValue(indexForm, name, value) {
        console.log("addFormValue - name"+name+"value"+value);

        let newFormsValues = this.state.formsValues.slice();
        let formValues = newFormsValues.filter((_,i) => i === indexForm);
        let attr = {"name": name, "value": value};
        formValues.push(attr);

        this.setState({
            formsValues: newFormsValues
        });
    }


    removeFormValue(indexForm, removeId) {
        console.log("removeFormValue - indexForm"+indexForm+" removeId"+removeId);
    }


    handleLoadFormsValues(event) {
        this.props.loadFormsValues(this.state.formsValues);
    }


    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>{strings.SearchFormList}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    {

                        this.state.formsValues.map((values, i) =>
                            <SearchForm index={i}
                                        attrTypes={this.props.attrTypes}
                                        removeForm={this.removeForm.bind(this)}
                                        changeFormValues={this.changeFormValues.bind(this)}
                                        key={i}
                                        valuesProp={values}
                            />
                        )
                    }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Button  bsStyle="primary" bsSize="small" onClick={() => this.handleAddForm()}>{strings.AddNewForm}</Button> <Button  bsStyle="warning" bsSize="small" onClick={() => this.handleLoadFormsValues()}>{strings.LoadFormsValues}</Button>
                    </div>
                </div>
            </div>
        )
    }
}


SearchFormList.PropTypes = {
    attrTypes: PropTypes.array.isRequired,
    formsValuesProp: PropTypes.array.isRequired,
    loadFormsValues: PropTypes.func,
};


export default SearchFormList;