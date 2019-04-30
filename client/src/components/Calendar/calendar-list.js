import React from 'react';
import { Link } from 'react-router-dom';
import { getRaceDate } from '../utils/functions';

const CalendarList = ({ races }) => {
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