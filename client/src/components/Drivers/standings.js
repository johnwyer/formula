import React from 'react';
import { Link } from 'react-router-dom';

const DriversIndexStandingsList = ({drivers}) => {
    const renderResult = (driver, position) => {
        return (
            <tr key={driver.id}>
                <td className="position">
                    <span className="team-number team-mercedes pos-1">
                        <span className="text">{position}</span>                    
                        <span style={{background: `${driver.teamColor}`}} className="color"></span>                            
                    </span>
                </td>
                <td className="name">
                    <span className="first-name">{driver.firstName}</span><span className="last-name"> {driver.lastName}</span>
                    <span className="tla">{driver.lastNameShort}</span>
                </td>
                <td className="country">{driver.country.code}</td>
                <td className="team">{driver.teamShortName}</td>
                <td className="car">                                            
                    <img src={`/images/team-car-icons/${driver.teamSlug}.png`} alt={`${driver.teamShortName} car`} />
                </td>                                        
                <td className="points">{driver.points}</td>                                    
            </tr>
        );
    };

    return (
        <div className="driver-index-aside">
            <div className="driver-index-standings">
                <div className="drivers-championship">
                    <div className="standings">
                        <h3 className="standings-title">            
                            <span>2019 Drivers Championship</span>
                        </h3>
                        <table>
                            <thead className="hidden">
                                <tr>
                                    <th scope="col" className="number"><abbr title="Position">Pos.</abbr></th>
                                    <th scope="col" className="name">Driver</th>
                                    <th scope="col" className="country">Country</th>
                                    <th scope="col" className="team">Team</th>
                                    <th scope="col" className="car">Car</th>
                                    <th scope="col" className="points">Points</th>            
                                </tr>
                            </thead>
                            <tbody>
                            {   
                                drivers.slice(0, 10).map((result, i) => (
                                    renderResult(result, (i + 1))
                                ))
                            }
                            </tbody>
                        </table>
                        <div className="morelink">
                            <Link to={"/results/drivers"} title="See full championship standings" className="driver-standings-more-link">See full championship standings</Link>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriversIndexStandingsList;