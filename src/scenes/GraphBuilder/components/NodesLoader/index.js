import React from 'react';
import MultiSelectField from './components/MultiSelectModel';
import {model_list} from "../../../../services/graph";
import {Button} from "react-bootstrap";
import {relation_list} from "../../../../services/graph/index";
import PropTypes from 'prop-types';

class NodesLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model_list:[],
            relation_list:[],
            selected_model_names: [],
            selected_relation_names: [],
        }

        this.selectModels = this.selectModels.bind(this);
        this.selectRelations = this.selectRelations.bind(this);

    }

    componentWillMount() {
        model_list(this);
        relation_list(this);
    }

    selectModels(models) {
        this.setState({
            selected_model_names:models,
        });
    }
    selectRelations(relations) {
        this.setState({
            selected_relation_names:relations,
        });
    }

    loadNodesForModels() {
        this.props.addNodes(this.state.selected_model_names);
    }

    loadEdgesForRelations() {
        this.props.addRelations(this.state.selected_relation_names);
    }


    render() {
        const model_options = [];
        this.state.model_list.map((item) => {
            let new_item = {
                label: item.name,
                value: item.name,
            }
            model_options.push(new_item);
        });
        const relation_options = [];
        this.state.relation_list.map((item) => {
            let new_item = {
                label: item.name,
                value: item.name,
            }
            relation_options.push(new_item);
        });

        //alert(JSON.stringify(this.state.selected_model));
        //const model_options = [];
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <MultiSelectField options={model_options} select={this.selectModels}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <Button  bsStyle="warning" bsSize="small" onClick={() => this.loadNodesForModels()}>Load nodes</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <MultiSelectField options={relation_options} select={this.selectRelations}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <Button  bsStyle="warning" bsSize="small" onClick={() => this.loadEdgesForRelations()}>Load relations</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NodesLoader.PropTypes = {
    addNodes: PropTypes.func.isRequired,
    addRelations: PropTypes.func.isRequired,

}
export default NodesLoader;