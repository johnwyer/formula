import React from 'react';
import { Link } from 'react-router-dom';

const ResultsIndexList = ({results}) => {
    const renderResult = (result) => (
        <tr key={result.id}>
            <td className="dark bold">
                <Link to={`/results/${result.slug}`} className="dark bold archive-link">{result.countryName}</Link>
            </td>
            <td className="dark hide-for-mobile">{result.dateEnd}</td>
            <td className="dark bold">
                <span className="hide-for-tablet">{result.result.driver.firstName}</span> <span className="hide-for-mobile">{result.result.driver.lastName}</span> <span className="uppercase hide-for-desktop">BOT</span>
            </td>    
            <td className="semi-bold uppercase ">{result.result.driver.teamShortName}</td>
            <td className="bold hide-for-mobile">{result.numberOfLaps}</td>
            <td className="dark bold hide-for-tablet">{result.result.result}</td>
        </tr>
    )
    return (
        <div className="table-wrap">
            <table className="resultsarchive-table">
                <thead>
                    <tr>
                        <th>Grand Prix</th>
                        <th className="hide-for-mobile">Date</th>
                        <th>Winner</th>
                        <th>Car</th>
                        <th className="hide-for-mobile">Laps</th>
                        <th className="hide-for-mobile">Time</th>
                    </tr>
                </thead>
                <tbody>
                {   
                    results.map((result) => (
                        renderResult(result)
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default ResultsIndexList;