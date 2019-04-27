import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const CalendarList = ({ races }) => {
    const getRaceDate = (dateStart, dateEnd) => {
        let start = moment(dateStart).format("MMM-DD").toLowerCase().split('-');
        let end = moment(dateEnd).format("MMM-DD").toLowerCase().split('-');
        let date = (start[0] === end[0]) ? `${start[1]}-${end[1]} ${start[0]}` : `${start[1]} ${start[0]} - ${end[1]} ${end[0]}`;
        
        return date;
    };

    return (
        <div className="calendar-list clearfix">
        {
            races.map((race) => {
                const isExpired = race.isExpired ? 'is-expired' : '';

                return (
                    <div className={`calendar-list-item ${isExpired}`} key={race._id}>
                        <Link to={`/calendar/${race.slug}`}>
                            <article className="race-teaser">
                                <figure className="race-teaser-image" style={{backgroundImage: `url(${race.trackImage})`}}></figure>
                                <section className="race-teaser-info">
                                    <p className="race-teaser-date">{getRaceDate(race.dateStart, race.dateEnd)}</p>
                                    <h4 className="race-teaser-title">{race.fullName}</h4>
                                    {
                                        race.isExpired ? 
                                        <p className="race-teaser-winner">
                                            <span className="icon icon-winner"></span> {race.raceWinner}
                                        </p>     
                                        : null                                   
                                    }
                                </section>
                            </article>
                        </Link>
                    </div>
                )
            })
        }            
        </div>
    );
};

export default CalendarList;