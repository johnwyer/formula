import React from 'react';
import CalendarDetailHeader from './detail-header';
import CalendarDetailResults from './detail-results';
import CalendarDetailTrackInfo from './detail-track-info';

const CalendarDetail = ({ race }) => {
    return (
        <React.Fragment>
            <CalendarDetailHeader race={race} />                        

            <div className="race-review-wrapper">
                <div className="container">
                    <h2 className="page-title">{race.fullName}</h2>
                    <CalendarDetailResults result={race.result} />
                    <CalendarDetailTrackInfo track={race.track} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default CalendarDetail;