import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import { connect } from 'react-redux';
import { Link } from '@material-ui/core';

class CalendarDetailIndex extends Component {
    render() {
        return (
            <SiteLayout classes="calendar-detail-page">
                <div className="hero-header">
                    <picture className="hero-header-image">
                        <img src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Australia.jpg.transform/9col/image.jpg" alt="Australia.jpg" />
                    </picture>
                    <div className="hero-content-wrapper">
                        <p className="race-location">Australia</p>
                        <picture className="hero-image">
                            <img src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/year%20icon/2019.png.transform/4col/image.png" alt="2019" />
                        </picture>
                        <p className="race-weekend-dates">14 - 17 mar</p>
                    </div>
                </div>                
                <div className="race-review-wrapper">
                    <div className="container">
                        <h2 className="page-title">FORMULA 1 ROLEX AUSTRALIAN GRAND PRIX 2019</h2>
                        <fieldset className="race-review">
                            <legend>Race Results</legend>
                            <div className="row">
                                <div className="col-lg-12">
                                    <ul className="f1-podium">
                                        <li className="f1-podium-item">
                                            <i className="icon2 icon-slash-1 f1-podium-icon" style={{color:'#00D2BE'}}></i>
                                            <span className="f1-podium-driver">
                                                <span className="f1-podium-firstname">Valtteri</span>&nbsp;<span className="f1-podium-lastname">Bottas</span>
                                            </span>
                                            <span className="f1-podium-time">1:25:27.325</span>
                                        </li>
                                        <li className="f1-podium-item">
                                            <i className="icon2 icon-slash-2 f1-podium-icon" style={{color:'#00D2BE'}}></i>
                                            <span className="f1-podium-driver">
                                                <span className="f1-podium-firstname">Lewis</span>&nbsp;<span className="f1-podium-lastname">Hamilton</span>
                                            </span>
                                            <span className="f1-podium-time">+20.886</span>
                                        </li>
                                        <li className="f1-podium-item">
                                            <i className="icon2 icon-slash-3 f1-podium-icon" style={{color:'#1E41FF'}}></i>
                                            <span className="f1-podium-driver">
                                                <span className="f1-podium-firstname">Max</span>&nbsp;<span className="f1-podium-lastname">Verstappen</span>
                                            </span>
                                            <span className="f1-podium-time">+22.520</span>
                                        </li>                                                                                
                                    </ul>
                                    <p className="race-review-ctas">
                                        <Link to={`/results/`} className="btn">Results <i class="icon2 icon-chevron-right"></i></Link>
                                    </p>
                                </div>
                            </div>
                        </fieldset>
                        <div className="race-map-wrapper">
                            <fieldset className="race-map">
                                <legend>
                                    <span className="f1-flag-wrapper">
                                        <picture>
                                            <img src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/australia-flag.png.transform/9col/image.png" alt="australia-flag.png" />
                                        </picture>
                                    </span>
                                    <span className="f1-track-name">Melbourne Grand Prix Circuit</span>
                                </legend>
                                <div className="row">
                                    <div className="col-xl-7 f1-race-map-wrapper">
                                        <p class="f1-race-map-track-name">Melbourne Grand Prix Circuit</p>
                                        <picture className="f1-race-map-image">
                                            <img src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png.transform/9col/image.png" alt="Australia_Circuit.png" />
                                        </picture>
                                    </div>
                                    <div className="col-xl-5">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="f1-stat">
                                                            <p className="f1-stat-label">First Grand Prix</p>
                                                            <p className="f1-stat-value">1996</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="f1-stat">
                                                            <p className="f1-stat-label">Number of Laps</p>
                                                            <p className="f1-stat-value">58</p>
                                                        </div>
                                                    </div>  
                                                    <div className="col-md-6">
                                                        <div className="f1-stat">
                                                            <p className="f1-stat-label">Circuit Length</p>
                                                            <p className="f1-stat-value">5.303<span>km</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="f1-stat">
                                                            <p className="f1-stat-label">Race Distance</p>
                                                            <p className="f1-stat-value">307.574 <span>km</span></p>
                                                        </div>
                                                    </div>  
                                                    <div className="col-md-12">
                                                        <div className="f1-stat no-margin">
                                                            <p className="f1-stat-label">Lap Record</p>
                                                            <p className="f1-stat-value">1:24.125 <span>Michael Schumacher (2004)</span></p>
                                                        </div>
                                                    </div>                                                                                                                                                                                                             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </SiteLayout>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(CalendarDetailIndex);