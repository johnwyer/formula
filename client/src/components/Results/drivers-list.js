import React from 'react';
//import { Link } from 'react-router-dom';

const ResultsDriversList = ({results}) => {
    const renderResult = (result, position) => (
        <tr key={result.id}>
            <td className="dark">{position}</td>
            <td className="dark bold">
                <span className="hide-for-tablet">{result.firstName}</span> <span className="hide-for-mobile">{result.lastName}</span> <span className="uppercase hide-for-desktop">{result.lastNameShort}</span>
            </td>    
            <td className="dark semi-bold uppercase">{result.country.code}</td>
            <td className="grey semi-bold uppercase">{result.teamShortName}</td>
            <td className="dark bold">{result.points}</td>
        </tr>
    )
    return (
        <div className="table-wrap">
            <table className="resultsarchive-table">
                <thead>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>Driver</th>
                        <th>Nationality</th>
                        <th>Car</th>
                        <th><abbr title="Points">PTS</abbr></th>
                    </tr>
                </thead>
                <tbody>
                {   
                    results.map((result, i) => (
                        renderResult(result, (i + 1))
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default ResultsDriversList;