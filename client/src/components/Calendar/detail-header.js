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
                    <img src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/year%20icon/2019.png.transform/4col/image.png" alt="2019" />
                </picture>
                <p className="race-weekend-dates">{getRaceDate(race.dateStart, race.dateEnd)}</p>
            </div>
        </div>  
    );
};

export default CalendarDetailHeader;