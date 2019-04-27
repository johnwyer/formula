import React from 'react';
import { Link } from 'react-router-dom';

const TeamsList = ({ teams }) => {
    return (
        <div className="teams-list">
        {
            teams.map((team) => (            
                <section className="team-list-item" key={team.id}>
                    <Link to={`/teams/${team.slug}`} className={'team-list-item-wrapper'}>
                        <div className="team-list-item-details">
                            <div className="panel-left">
                                <div className="panel-left-upper">
                                    <h3 className="team-list-item-title">
                                        <span className="team-list-item-flag">
                                            <img 
                                                className="image"
                                                src={`/images/flags/${team.country.code.toLowerCase()}.png`}                                                     
                                                alt={team.country.name}
                                            />
                                        </span>
                                        {team.shortName}
                                    </h3>
                                    <ul className="team-list-item-drivers">
                                        <li className="team-list-item-driver">{team.driver_1.name}</li>
                                        <li className="team-list-item-driver">{team.driver_2.name}</li>
                                    </ul>
                                </div>
                                <div className="panel-left-lower">
                                    <div className="team-list-item-sponsor">
                                        <img 
                                            src={team.teamLogo}
                                            alt={team.officialName}
                                        />
                                    </div>
                                </div>
                            </div>
                            <table className="stat-list">
                                <tbody>
                                    <tr className="stat-row">
                                        <th className="stat-key">
                                            <span className="icon icon-podiums"></span>
                                            <span className="text">Podium Finishes</span>
                                        </th>
                                        <td className="stat-value">{team.podiums}</td>
                                    </tr>
                                    <tr className="stat-row">
                                        <th className="stat-key">
                                            <span className="icon icon-titles"></span>
                                            <span className="text">Championship Titles</span>
                                        </th>
                                        <td className="stat-value">{team.worldChampionships}</td>
                                    </tr>                                        
                                </tbody>
                            </table>
                        </div>
                        <div className="team-list-item-image">
                            <span className="team-color" style={{background:`${team.teamColor}`}}></span>
                            <div className="team-adaptiveimage">
                                <img 
                                    className="image"
                                    src={team.teamCarImage}
                                    alt={team.officialName}
                                />
                            </div>
                        </div>
                    </Link>
                </section>
            )) 
        }
        </div>
    )
};

export default TeamsList;