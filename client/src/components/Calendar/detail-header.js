import React from 'react';
import { getRaceDate } from '../utils/functions';

const CalendarDetailHeader = ({ race }) => {
    return (
        <div className="hero-header">
            <picture className="hero-header-image">
                <img src={race.headingImage} alt={race.country.name} />
            </picture>
            <div className="hero-content-wrapper">
                <p className="race-location">{race.country.name}</p>
                <picture className="hero-image">
                    <img src="/images/year-icon.png" alt="2019" />
                </picture>
                <p className="race-weekend-dates">{getRaceDate(race.dateStart, race.dateEnd)}</p>
            </div>
        </div>  
    );
};

export default CalendarDetailHeader;