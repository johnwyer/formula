import React from 'react';

const HomeLastResult = () => {
    return (
        <div className="f1-tab-content tab-pane fade last-race" id="last-race">
            <div className="container">
                <div className="col-xl-10 offset-xl-1">
                    <h3 className="title">Spain</h3>
                    <div className="race-year-image"><img src="/images/year-icon.png" alt="2019" /></div>
                    <p className="race-title"><a href="/">FORMULA 1 EMIRATES GRAN PREMIO DE ESPAÑA 2019<i className="icon2 icon-chevron-right"></i></a></p>
                    <ul className="f1-podium">
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">1</span>
                                <span className="team-color-icon" style={{background: "#00D2BE"}}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Lewis</span>
                                    <strong className="f1-podium-surname">Hamilton</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">26 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>

                        <li className="f1-podium-item">
                            <a href="/en/drivers/valtteri-bottas.html" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{background: "#00D2BE"}}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">18 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>

                        <li className="f1-podium-item">
                            <a href="/en/drivers/max-verstappen.html" className="f1-podium-link">
                                <span className="f1-podium-rank">3</span>
                                <span className="team-color-icon" style={{background: "#1E41FF"}}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Max</span>
                                    <strong className="f1-podium-surname">Verstappen</strong>
                                </span>
                                <span className="f1-podium-subdetail">Red Bull Racing</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">15 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                    <a href="/" className="btn">RACE RESULTS<i className="icon2 icon-chevron-right"></i></a>
                </div>
            </div>
        </div>
    );
};

export default HomeLastResult;