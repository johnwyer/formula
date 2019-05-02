import React from 'react';
import { Link } from 'react-router-dom';

const DriversIndexList = ({drivers}) => {
    return (
        drivers.map((driver) => (
            <Link to={`/drivers/${driver.slug}`} className="driver-teaser" key={driver.id}>
                <figure>
                    <div className="driver-teaser-image-wrapper">
                        <div className="driver-teaser-image-outer">
                            <div className="driver-teaser-image-inner">
                                <div className="driver-teaser-image">
                                    <img src={driver.driverImage} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <figcaption className="driver-details">
                        <div className="driver-number">
                            <span>{driver.number}</span>
                        </div>
                        <h2 className="driver-name">{driver.firstName} {driver.lastName}</h2>
                        <p className="driver-team"><span>{driver.team.shortName}</span></p>
                    </figcaption>
                </figure>
            </Link>
        ))
    );
};

export default DriversIndexList;