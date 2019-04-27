import React from 'react';
import { Link } from 'react-router-dom';

const TeamDetail = ({ team }) => {
    return (
        <React.Fragment>
            <h2 className="page-title">{team.shortName}</h2>
            <div className="team-details">
                <section className="stats">
                    <div className="team-stats">
                        <div className="extra-info">
                            <div className="brand-logo">
                                <img 
                                    src={team.teamLogo} 
                                    alt={team.fullName} 
                                />
                            </div>
                        </div>
                        <table className="stat-list">
                            <tbody>
                                <tr>
                                    <th className="stat-key">Full Team Name</th>
                                    <td className="stat-value">{team.officialName}</td>
                                </tr>
                                <tr>
                                    <th className="stat-key">Base</th>
                                    <td className="stat-value">{team.base}</td>
                                </tr>
                                <tr>
                                    <th className="stat-key">Team Chief</th>
                                    <td className="stat-value">{team.teamChief}</td>
                                </tr>
                                <tr>
                                    <th className="stat-key">Technical Chief</th>
                                    <td className="stat-value">{team.technicalChief}</td>
                                </tr>
                                <tr>
                                    <th className="stat-key">Chassis</th>
                                    <td className="stat-value">{team.chassisNumber}</td>
                                </tr>
                                <tr>
                                    <th className="stat-key">Power Unit</th>
                                    <td className="stat-value">{team.powerUnit}</td>
                                </tr>
                                <tr>
                                    <th className="stat-key">First Team Entry</th>
                                    <td className="stat-value">{team.firstTeamEntry}</td>
                                </tr> 
                                <tr>
                                    <th className="stat-key">World Championships</th>
                                    <td className="stat-value">{team.worldChampionships}</td>
                                </tr> 
                                <tr>
                                    <th className="stat-key">Highest Race Finish</th>
                                    <td className="stat-value">{team.highestRaceFinish} 
                                        {
                                            team.highestRaceFinish === 1 ? ` (x${team.numberOfWictories})` : ''
                                        }
                                    </td>
                                </tr>        
                                <tr>
                                    <th className="stat-key">Pole Positions</th>
                                    <td className="stat-value">{team.polePositions}</td>
                                </tr>    
                                <tr>
                                    <th className="stat-key">Fastest Laps</th>
                                    <td className="stat-value">{team.fastestLaps}</td>
                                </tr>                                                                                                                                                      
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="profile">
                    <ul className="drivers">
                        <li>
                            <Link to={`/drivers/${team.driver_1.slug}`} className={'driver-teaser'}>
                                <figure>
                                    <div className="driver-image">  
                                        <div className="driver-image-outer">
                                            <div className="driver-image-inner">
                                                <div className="adaptive-image">
                                                    <img 
                                                        className="image" 
                                                        src={team.driver_1.driverImage}
                                                        alt={team.driver_1.name}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <figcaption className="driver-details">
                                        <div className="driver-number"><span>{team.driver_1.number}</span></div>
                                        <h2 className="driver-name">{team.driver_1.name}</h2>
                                        <p className="driver-team"><span>{team.shortName}</span></p>
                                    </figcaption>
                                </figure>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/drivers/${team.driver_2.slug}`} className={'driver-teaser'}>
                                <figure>
                                    <div className="driver-image">  
                                        <div className="driver-image-outer">
                                            <div className="driver-image-inner">
                                                <div className="adaptive-image">
                                                    <img 
                                                        className="image" 
                                                        src={team.driver_2.driverImage}
                                                        alt={team.driver_2.name}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <figcaption className="driver-details">
                                        <div className="driver-number"><span>{team.driver_2.number}</span></div>
                                        <h2 className="driver-name">{team.driver_2.name}</h2>
                                        <p className="driver-team"><span>{team.shortName}</span></p>                                    
                                    </figcaption>
                                </figure>
                            </Link>                        
                        </li>
                    </ul>
                </section>
            </div>
        </React.Fragment>
    );
};

export default TeamDetail;