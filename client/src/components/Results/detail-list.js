import React from 'react';
import { getRaceFullDate } from '../utils/functions';

const ResultsDetailList = ({ result }) => {
    const renderResult = (result) => (
        <tr key={result.driver.id}>
            <td className="dark">{result.position}</td>
            <td className="dark hide-for-mobile">{result.driver.number}</td>
            <td className="dark bold">
                <span className="hide-for-tablet">{result.driver.firstName}</span> <span className="hide-for-mobile">{result.driver.lastName}</span> <span className="uppercase hide-for-desktop">{result.driver.lastNameShort}</span>
            </td>
            <td className="semi-bold uppercase hide-for-tablet">{result.driver.teamShortName} {result.driver.chassisNumber} {result.driver.powerUnit}</td>
            <td className="bold hide-for-mobile">{result.laps}</td>
            <td className="dark bold">{result.result}</td>
            <td className="bold">{result.driver.points}</td>
        </tr>
    );
    return (
        <React.Fragment>
            <h2 className="page-title">{result.fullName} - RACE RESULT</h2>
            <p className="date">
                <span className="full-date">{getRaceFullDate(result.dateStart, result.dateEnd)},</span>
                <span className="circuit-info">{result.trackOfficialName}</span>
            </p>
            <div className="table-wrap">
                <table className="resultsarchive-table">
                    <thead>
                        <tr>
                            <th><abbr title="Position">Pos</abbr></th>
                            <th className="hide-for-mobile"><abbr title="Number">No</abbr></th>
                            <th>Driver</th>
                            <th className="hide-for-tablet">Car</th>
                            <th className="hide-for-mobile">Laps</th>
                            <th>Time/Retired</th>
                            <th><abbr title="Points">PTS</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        result.result.map((result) => (
                            renderResult(result)
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default ResultsDetailList;