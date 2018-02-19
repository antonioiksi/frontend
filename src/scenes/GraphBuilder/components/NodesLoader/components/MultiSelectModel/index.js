import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './react-select.css';

const FLAVOURS = [
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Vanilla', value: 'vanilla' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Caramel', value: 'caramel' },
    { label: 'Cookies and Cream', value: 'cookiescream' },
    { label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
    { label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));


class MultiSelectField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            removeSelected: true,
            disabled: false,
            crazy: false,
            stayOpen: false,
            value: [],
            rtl: false,
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    handleSelectChange (value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
        this.props.select(value.split(","));
    }
    toggleCheckbox (e) {
        this.setState({
            [e.target.name]: e.target.checked,
        });
    }
    toggleRtl (e) {
        let rtl = e.target.checked;
        this.setState({ rtl });
    }

    render () {
        const { crazy, disabled, stayOpen, value } = this.state;
        //const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
        const options = this.props.options;
        return (
            <div className="section">
                <Select
                    closeOnSelect={!stayOpen}
                    disabled={disabled}
                    multi
                    onChange={this.handleSelectChange}
                    options={options}
                    placeholder="Select your favourite(s)"
                    removeSelected={this.state.removeSelected}
                    rtl={this.state.rtl}
                    simpleValue
                    value={value}
                />
           </div>
        );
    }
}

MultiSelectField.PropTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    select: PropTypes.func.isRequired,
}

MultiSelectField.displayName = 'MultiSelectField';

export default MultiSelectField;