import React from 'react';
import { Link } from 'react-router-dom';

const HomeLastResult = ({result}) => {
    const renderList = (results) => {
        return results.slice(0, 10).map((result) => {
            return (
                <li className="f1-podium-item" key={result.driver.id}>
                    <Link to={`/drivers/${result.driver.slug}`} className="f1-podium-link">
                        <span className="f1-podium-rank">{result.position}</span>
                        <span className="team-color-icon" style={{background: `${result.driver.teamColor}`}}></span>
                        <span className="f1-podium-driver">
                            <span className="f1-podium-name">{result.driver.firstName}</span>
                            <strong className="f1-podium-surname">{result.driver.lastName}</strong>
                        </span>
                        <span className="f1-podium-subdetail">{result.driver.teamShortName}</span>
                        <span className="f1-podium-right">
                            <span className="f1-podium-time">{result.driver.points} PTS</span>
                            <i className="icon2 icon-chevron-right"></i>
                        </span>
                    </Link>
                </li>
            )
        })
    };

    return (
        <div className="f1-tab-content tab-pane fade last-race" id="last-race">
            <div className="container">
                <div className="col-xl-10 offset-xl-1">
                    <h3 className="title">{result.countryName}</h3>
                    <div className="race-year-image"><img src="/images/year-icon.png" alt="2019" /></div>
                    <p className="race-title">
                        <Link to={`/calendar/${result.slug}`}>{result.fullName}<i className="icon2 icon-chevron-right"></i></Link>
                    </p>
                    <ul className="f1-podium last-race">
                        { renderList(result.result) }                        
                    </ul>
                    <Link to={`/results/${result.slug}`} className="btn">RACE RESULTS<i className="icon2 icon-chevron-right"></i></Link>
                </div>
            </div>
        </div>
    );
};

export default HomeLastResult;