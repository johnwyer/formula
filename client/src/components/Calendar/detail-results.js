import React from 'react';
import { Link } from 'react-router-dom';

const CalendarDetailResults = ({ results, slug }) => {
    const renderResult = (result, i) => {
        return (
            i < 3 ?
                <li className="f1-podium-item" key={result.driver.id}>
                    <i className={`icon2 icon-slash-${result.position} f1-podium-icon`} style={{color:`${result.driver.teamColor}`}}></i>
                    <span className="f1-podium-driver">
                        <span className="f1-podium-firstname">{result.driver.firstName}</span>&nbsp;<span className="f1-podium-lastname">{result.driver.lastName}</span>
                    </span>
                    <span className="f1-podium-driver-team">
                        <span className="f1-podium-driver-team-full">{result.driver.teamOfficialName}</span>
                        <span className="f1-podium-driver-team-short">{result.driver.teamShortName}</span>
                    </span>                    
                    <span className="f1-podium-time">{result.result}</span>
                </li>
                : null
        )
    };

    const resultLink = `/results/${slug}`;

    return (        
        <React.Fragment>            
            <fieldset className="race-review">
                <legend>Race Results</legend>
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="f1-podium">
                            {
                                results.map((result, i) => (
                                    renderResult(result, i)
                                ))
                            }                                                                              
                        </ul>
                        <p className="race-review-ctas">
                            <Link to={resultLink} className="btn">Results<i className="icon2 icon-chevron-right"></i></Link>
                        </p>
                    </div>
                </div>
            </fieldset>            
        </React.Fragment>
    );
};

export default CalendarDetailResults;