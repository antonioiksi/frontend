import React from 'react';
import {connect} from "react-redux";
import {Button, Table} from "react-bootstrap";
import {bin_items, item_load, bin_reset, item_delete} from "../../../../services/business";
import ReactJson from 'react-json-view'
import {user_bins, bin_activate} from "../../../../services/business";
import {strings} from "../../../../localization";
import DownloadFlatData from "../DownloadFlatData/index";


class UserBins extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bin_items : [],
            bin_pk: null,
            item : {},
        }
    }

    componentWillMount() {
        user_bins();
    }

    handleReset(bin_pk) {
        bin_reset(bin_pk);
        /*this.setState({
                values: this.state.values.filter((_,i) => i !== removeId)
            },
            () => {this.props.changeFormValues(this.props.index, this.state.values)}
        );*/
    }

    handleLoad(bin_pk) {
        //console.log('bin_pk' + bin_pk);
        bin_items(this, bin_pk)
        /*this.setState({
                values: this.state.values.filter((_,i) => i !== removeId)
            },
            () => {this.props.changeFormValues(this.props.index, this.state.values)}
        );*/
    }

    handleActivate(bin_pk) {
        bin_activate(this, bin_pk)
    }

    handleItemLoad(item_pk) {
        //console.log('item_pk' + item_pk);
        item_load(this, item_pk);
        /*this.setState({
                values: this.state.values.filter((_,i) => i !== removeId)
            },
            () => {this.props.changeFormValues(this.props.index, this.state.values)}
        );*/
    }

    handleItemDelete(item_pk) {
        item_delete(this, this.state.bin_pk, item_pk);
    }

    render() {

        console.log(this.props.user_bins);

        return(
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Active}</th>
                                <th>{strings.Count}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.user_bins.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.active ? <i class="fa fa-check-square-o" aria-hidden="true"></i> : ''}</td>
                                        <td>{value.items_count}</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.handleReset(value.id)}>{strings.Reset}</Button>&#160;
                                            <Button  bsStyle="warning" bsSize="small" onClick={() => this.handleLoad(value.id)}>{strings.Load}</Button>&#160;
                                            <Button  bsStyle="success" bsSize="small" onClick={() => this.handleActivate(value.name)}>{strings.Activate}</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Id</th>
                                <th>Url</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.bin_items.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.id}</td>
                                        <td>{value.url}</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.handleItemDelete(value.id)}>{strings.Delete}</Button>&#160;
                                            <Button  bsStyle="warning" bsSize="small" onClick={() => this.handleItemLoad(value.id)}>{strings.Load}</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {
                            Object.keys(this.state.item).length !== 0 ? (
                                <DownloadFlatData binItem_data={this.state.item}/>
                            ) : (
                                ''
                            )
                        }

                        <ReactJson src={this.state.item}  />
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = function(store) {
    return {
        user_bins: store.business.user_bins,
    };
};


export default connect(mapStateToProps)(UserBins);