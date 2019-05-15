import React from 'react';

const CalendarDetailTrackInfo = ({ track, country }) => {
    return (
        <div className="race-map-wrapper">
            <fieldset className="race-map">
                <legend>
                    <span className="f1-flag-wrapper">
                        <picture>
                            <img src={`/images/flags/${country.code.toLowerCase()}.png`} alt="" />
                        </picture>
                    </span>
                    <span className="f1-track-name">{track.officialName}</span>
                </legend>
                <div className="row">
                    <div className="col-xl-7 f1-race-map-wrapper">
                        <p className="f1-race-map-track-name">{track.officialName}</p>
                        <picture className="f1-race-map-image">
                            <img src={track.trackConfiguration} alt={track.officialName} />
                        </picture>
                    </div>
                    <div className="col-xl-5">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="f1-stat">
                                            <p className="f1-stat-label">First Grand Prix</p>
                                            <p className="f1-stat-value">{track.firstFrandPrixEntry}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="f1-stat">
                                            <p className="f1-stat-label">Number of Laps</p>
                                            <p className="f1-stat-value">{track.numberOfLaps}</p>
                                        </div>
                                    </div>  
                                    <div className="col-md-6">
                                        <div className="f1-stat">
                                            <p className="f1-stat-label">Circuit Length</p>
                                            <p className="f1-stat-value">{track.cirquitLength}<span>km</span></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="f1-stat">
                                            <p className="f1-stat-label">Race Distance</p>
                                            <p className="f1-stat-value">{track.raceDistance} <span>km</span></p>
                                        </div>
                                    </div>  
                                    <div className="col-md-12">
                                        <div className="f1-stat no-margin">
                                            <p className="f1-stat-label">Lap Record</p>
                                            <p className="f1-stat-value">{track.lapRecord} <span>{track.lapRecordOwner}</span></p>
                                        </div>
                                    </div>                                                                                                                                                                                                             
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
};

export default CalendarDetailTrackInfo;