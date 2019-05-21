import React from 'react';
import { Link } from 'react-router-dom';

const HomeDriverStandings = ({ drivers }) => {
    const getPositionClass = (i) => {
        switch(i) {
            case 1:
                return 'pos-2';
            case 2:
                return 'pos-1';
            case 3:
                return 'pos-3';
            default:
                return 'pos-1';
        }
    };

    const getIconClass = (i) => {
        switch(i) {
            case 1:
                return 'icon-slash-2';
            case 2:
                return 'icon-slash-1';
            case 3:
                return 'icon-slash-3';
            default:
                return 'icon-slash-1';
        }
    };

    const renderPodium = (drivers) => {
        const topDrivers = [drivers[1], drivers[0], drivers[2]];
        return topDrivers.map((driver, i) => {
            return (
                <Link to={`/drivers/${driver.slug}`} className={`f1-podium-position ${getPositionClass(i + 1)}`} key={driver.id}>
                    <div className="driver-rank">
                        <i className={`icon2 ${getIconClass(i + 1)}`} style={{color: `${driver.teamColor}`}}></i>
                        <div className="team-border" style={{ background: `${driver.teamColor}` }}></div>
                        <picture className="driver-image">
                            <img src={`/images/drivers-shapes/${driver.slug}.png`} alt="" />
                        </picture>
                    </div>
                    <div className="driver-name">
                        <span className="f1-podium-driver">
                            <span className="f1-podium-name">{driver.firstName}</span>
                            <span className="f1-podium-flag">
                                <picture className="team-flag">
                                    <img src={`/images/flags/${driver.country.code.toLowerCase()}.png`} alt="" />
                                </picture>
                            </span>
                            <strong className="f1-podium-surname">{driver.lastName}</strong>
                        </span>
                    </div>
                </Link>                    
            )
        })
    };
    
    const renderList = (drivers) => {
        return drivers.slice(0, 10).map((driver, i) => {
            return (
                <li className="f1-podium-item" key={driver.id}>
                    <Link to={`/drivers/${driver.slug}`} className="f1-podium-link">
                        <span className="f1-podium-rank">{i + 1}</span>
                        <span className="team-color-icon" style={{ background: `${driver.teamColor}` }}></span>
                        <span className="f1-podium-driver">
                            <span className="f1-podium-name">{driver.firstName}</span>
                            <strong className="f1-podium-surname">{driver.lastName}</strong>
                        </span>
                        <span className="f1-podium-subdetail">{driver.teamShortName}</span>
                        <span className="f1-podium-right">
                            <span className="f1-podium-time">{driver.points} PTS</span>
                            <i className="icon2 icon-chevron-right"></i>
                        </span>
                    </Link>
                </li>
            )
        })
    };

    return (
        <div className="f1-tab-content tab-pane fade active show" id="drivers">
            <div className="container">
                <div className="col-xl-10 offset-xl-1">
                    <h3 className="title">DRIVER STANDINGS</h3>
                    <div className="f1-podium-top-position">
                        { renderPodium(drivers) }
                    </div>
                    <ul className="f1-podium">
                        { renderList(drivers) }                        
                    </ul>
                    <Link to="/results/drivers" className="btn">VIEW FULL STANDINGS<i className="icon2 icon-chevron-right"></i></Link>
                </div>
            </div>
        </div>
    );
};

export default HomeDriverStandings;