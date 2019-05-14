import React from 'react';

const ResultsTeamsList = ({results}) => {
    const renderResult = (result, position) => (
        <tr key={result.id}>
            <td className="dark">{position}</td>
            <td className="dark bold">
                <span className="hide-for-mobile">{result.officialName}</span> <span className="uppercase hide-for-desktop">{result.shortName}</span>
            </td>    
            <td className="dark bold">{result.points}</td>
        </tr>
    )
    return (
        <div className="table-wrap">
            <table className="resultsarchive-table">
                <thead>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>Team</th>
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

export default ResultsTeamsList;