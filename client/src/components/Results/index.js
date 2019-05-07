import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class ResultsIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount() {

    };

    render() {
        return (
            <SiteLayout classes={`results-page`}>
                <h2 className="page-title">2019 RACE RESULTS</h2>
                <div className="table-wrap">
                    <table className="resultsarchive-table">
                        <thead>
                            <tr>
                                <th>Grand Prix</th>
                                <th className="hide-for-mobile">Date</th>
                                <th>Winner</th>
                                <th>Car</th>
                                <th className="hide-for-mobile">Laps</th>
                                <th className="hide-for-mobile">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="dark bold">
                                    <Link to={`/results/`} className="dark bold ArchiveLink">Australia</Link>
                                </td>
                                <td className="dark hide-for-mobile">17 Mar 2019</td>
                                <td className="dark bold">
                                    <span className="hide-for-tablet">Valtteri</span> <span className="hide-for-mobile">Bottas</span> <span className="uppercase hide-for-desktop">BOT</span>
                                </td>    
                                <td className="semi-bold uppercase ">Mercedes</td>
                                <td className="bold hide-for-mobile">58</td>
                                <td className="dark bold hide-for-tablet">1:25:27.325</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </SiteLayout>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(ResultsIndex);