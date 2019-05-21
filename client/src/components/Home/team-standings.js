import React from 'react';
import { Link } from 'react-router-dom';

const HomeTeamStandings = ({ teams }) => {
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

    const renderPodium = (teams) => {
        const topTeams = [teams[1], teams[0], teams[2]];
        return topTeams.map((team, i) => {
            return (
                <Link to={`/teams/${team.slug}`} className={`f1-podium-position ${getPositionClass(i + 1)}`} key={team.id}>
                    <div className="constructor-rank">
                        <picture className="constructor-logo">
                            <img src={`${team.teamLogo}`} alt={team.teamShortname} />
                        </picture>
                        <i className={`icon2 ${getIconClass(i + 1)}`} style={{ color: `${team.teamColor}` }}></i>
                    </div>
                    <div className="constructors-car">
                        <picture className="car-image">
                            <img src={`/images/team-car-icons/${team.slug}.png`} alt={team.teamShortname} />
                        </picture>
                    </div>
                </Link>                
            )
        });
    };

    const renderList = (teams) => {
        return teams.map((team, i) => {
            return (
                <li className="f1-podium-item" key={team.id}>
                    <Link to={`/teams/${team.slug}`} className="f1-podium-link">
                        <span className="f1-podium-rank">{i + 1}</span>
                        <span className="team-color-icon" style={{ background: `${team.teamColor}` }}></span>
                        <span className="f1-podium-driver">
                            <strong className="f1-podium-surname">{team.shortName}</strong>
                        </span>
                        <span className="f1-podium-subdetail">{team.driver_1_lastName} / {team.driver_2_lastName}</span>
                        <span className="f1-podium-right">
                            <span className="f1-podium-car">
                                <img src={`/images/team-car-icons/${team.slug}.png`} alt={team.shortName} />
                            </span>
                            <span className="f1-podium-time">{team.points} PTS</span>
                            <i className="icon2 icon-chevron-right"></i>
                        </span>
                    </Link>
                </li>                    
            )        
        })
    };

    return (
        <div className="f1-tab-content tab-pane fade" id="constructors">
            <div className="container">
                <div className="col-xl-10 offset-xl-1">
                    <h3 className="title">Constructor STANDINGS</h3>
                    <div className="f1-podium-top-position constructors">
                        { renderPodium(teams) }
                    </div>
                    <ul className="f1-podium constructors">
                        { renderList(teams) }
                    </ul>
                    <Link to={`/results/teams`} className="btn">VIEW FULL STANDINGS<i className="icon2 icon-chevron-right"></i></Link>
                </div>
            </div>
        </div>
    );
};

export default HomeTeamStandings;