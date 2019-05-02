import React from 'react';
import { Link } from 'react-router-dom';

const DriversIndexList = ({ drivers }) => {
    const renderDriver = (driver) => {
        return (
            <Link to={`/drivers/${driver.slug}`} className="driver-teaser" key={driver.id}>
                <figure>
                    <div className="driver-teaser-image-wrapper">
                        <div className="driver-teaser-image-outer">
                            <div className="driver-teaser-image-inner">
                                <div className="driver-teaser-image">
                                    <img src={driver.driverImage} alt={driver.name} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <figcaption className="driver-details">
                        <div className="driver-number">
                            <span>{driver.number}</span>
                        </div>
                        <h2 className="driver-name">{driver.name}</h2>
                        <p className="driver-team"><span>{driver.team.shortName}</span></p>
                    </figcaption>
                </figure>
            </Link>
        );
    };

    return (
        <div className="drivers-list clearfix">
        {
            drivers.map((driver) => (
                renderDriver(driver)
            ))
        }
        </div>
    );
};

export default DriversIndexList;