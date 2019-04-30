import React from 'react';
import { Link } from '@material-ui/core';

const CalendarDetailResults = ({ result }) => {

    //console.log(result.position_1.driver.firstName);
    //console.log(result.position_2.driver.lastName);
    return (        
        <React.Fragment>            
            <fieldset className="race-review">
                <legend>Race Results</legend>
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="f1-podium">
                            <li className="f1-podium-item">
                                <i className={`icon2 icon-slash-${result.position_1.position} f1-podium-icon`} style={{color:`${result.position_1.driver.teamColor}`}}></i>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-firstname">{result.position_1.driver.firstName}</span>&nbsp;<span className="f1-podium-lastname">{result.position_1.driver.lastName}</span>
                                </span>
                                <span className="f1-podium-time">{result.position_1.result}</span>
                            </li>
                            <li className="f1-podium-item">
                                <i className="icon2 icon-slash-2 f1-podium-icon" style={{color:`${result.position_2.driver.teamColor}`}}></i>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-firstname">{result.position_2.driver.firstName}</span>&nbsp;<span className="f1-podium-lastname">{result.position_2.driver.lastName}</span>
                                </span>
                                <span className="f1-podium-time">{result.position_2.result}</span>
                            </li>
                            <li className="f1-podium-item">
                                <i className="icon2 icon-slash-3 f1-podium-icon" style={{color:`${result.position_3.driver.teamColor}`}}></i>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-firstname">{result.position_3.driver.firstName}</span>&nbsp;<span className="f1-podium-lastname">{result.position_3.driver.lastName}</span>
                                </span>
                                <span className="f1-podium-time">{result.position_3.result}</span>
                            </li>                                                                                
                        </ul>
                        <p className="race-review-ctas">
                            <Link to={`/results/`} className="btn">Results <i className="icon2 icon-chevron-right"></i></Link>
                        </p>
                    </div>
                </div>
            </fieldset>            
        </React.Fragment>
    );
};

export default CalendarDetailResults;