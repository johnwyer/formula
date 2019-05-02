import React from 'react';

const DriverDetailList = ({ driver }) => {
    return (
        <div className="driver-details">
            <section className="profile">
                <figure className="driver-title">
                    <div className="driver-main-image">
                        <div className="driver-main-image-outer">
                            <div className="driver-main-image-inner">
                                <img src={driver.driverImage} className="image" alt="" />
                            </div>
                        </div>
                    </div>
                    <figcaption className="driver-detail">
                        <div className="driver-number">
                            <span>{driver.number}</span>
                            <span className="driver-flag">
                                <img src={`/images/flags/${driver.country.code.toLowerCase()}.png`} alt="" />
                            </span>
                        </div>
                        <h2 className="driver-name">{driver.name}</h2>
                    </figcaption>
                </figure>
            </section>
            <section className="stats">
                <div className="stats-list-component">
                    <div className="extra-info">
                        <div className="brand-logo">
                            <img src={driver.driverHelmetImage} alt="" />
                        </div>
                    </div>
                    <table className="stat-list">
                        <tbody>
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Team</span>
                                </th>
                                <td className="stat-value">{driver.team.shortName}</td>
                            </tr>
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Country</span>
                                </th>
                                <td className="stat-value">{driver.country.name}</td>
                            </tr>   
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Podiums</span>
                                </th>
                                <td className="stat-value">{driver.podiums}</td>
                            </tr>
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Points</span>
                                </th>
                                <td className="stat-value">{driver.points}</td>
                            </tr> 
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Grands Prix entered</span>
                                </th>
                                <td className="stat-value">{driver.grandPrix}</td>
                            </tr>
                            <tr>
                                <th className="stat-key">
                                    <span className="text">World Championships</span>
                                </th>
                                <td className="stat-value">{ driver.worldChampionships > 0 ? driver.worldChampionships : 'N/A' }</td>
                            </tr>
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Highest race finish</span>
                                </th>
                                <td className="stat-value">{driver.highestRaceFinish} { driver.numberOfWictories !== 0 ? `(x${driver.numberOfWictories})` : '' }</td>
                            </tr>  
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Highest grid position</span>
                                </th>
                                <td className="stat-value">{driver.polePositions}</td>
                            </tr>
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Date of birth</span>
                                </th>
                                <td className="stat-value">{driver.dateOfBirth}</td>
                            </tr> 
                            <tr>
                                <th className="stat-key">
                                    <span className="text">Place of birth</span>
                                </th>
                                <td className="stat-value">{driver.placeOfBirth}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>    
            </section>
        </div>
    );
};

export default DriverDetailList;