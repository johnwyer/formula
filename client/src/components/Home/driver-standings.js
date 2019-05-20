import React from 'react';

const HomeDriverStandings = () => {
    return (
        <div className="f1-tab-content tab-pane fade active show" id="drivers">
            <div className="container">
                <div className="col-xl-10 offset-xl-1">
                    <h3 className="title">DRIVER STANDINGS</h3>
                    <div className="f1-podium-top-position">
                        <a href="/" className="f1-podium-position pos-2">
                            <div className="driver-rank">
                                <i className="icon2 icon-slash-2"></i>
                                <div className="team-border" style={{ background: '#00D2BE' }}></div>
                                <picture className="driver-image">
                                    <img src="/images/drivers-shapes/valtteri-bottas.png" alt="" />
                                </picture>
                            </div>
                            <div className="driver-name">
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <span className="f1-podium-flag">
                                        <picture className="team-flag">
                                            <img src="/images/flags/fi.png" alt="" />
                                        </picture>
                                    </span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                            </div>
                        </a>
                        <a href="/" className="f1-podium-position pos-1">
                            <div className="driver-rank">
                                <i className="icon2 icon-slash-1"></i>
                                <div className="team-border"></div>
                                <picture className="driver-image">
                                    <img src="/images/drivers-shapes/lewis-hamilton.png" alt="" />
                                </picture>
                            </div>
                            <div className="driver-name">
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Lewis</span>
                                    <span className="f1-podium-flag">
                                        <picture className="team-flag">
                                            <img src="/images/flags/gb.png" alt="" />
                                        </picture>
                                    </span>
                                    <strong className="f1-podium-surname">Hamilton</strong>
                                </span>
                            </div>
                        </a>
                        <a href="/" className="f1-podium-position pos-3">
                            <div className="driver-rank">
                                <i className="icon2 icon-slash-3"></i>
                                <div className="team-border"></div>
                                <picture className="driver-image">
                                    <img src="/images/drivers-shapes/max-verstappen.png" alt="" />
                                </picture>
                            </div>
                            <div className="driver-name">
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Max</span>
                                    <span className="f1-podium-flag">
                                        <picture className="team-flag">
                                            <img src="/images/flags/nl.png" alt="" />
                                        </picture>
                                    </span>
                                    <strong className="f1-podium-surname">Verstappen</strong>
                                </span>
                            </div>
                        </a>
                    </div>
                    <ul className="f1-podium">
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">1</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Lewis</span>
                                    <strong className="f1-podium-surname">Hamilton</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">112 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                        <li className="f1-podium-item">
                            <a href="/" className="f1-podium-link">
                                <span className="f1-podium-rank">2</span>
                                <span className="team-color-icon" style={{ background: '#00D2BE' }}></span>
                                <span className="f1-podium-driver">
                                    <span className="f1-podium-name">Valtteri</span>
                                    <strong className="f1-podium-surname">Bottas</strong>
                                </span>
                                <span className="f1-podium-subdetail">Mercedes</span>
                                <span className="f1-podium-right">
                                    <span className="f1-podium-time">105 PTS</span>
                                    <i className="icon2 icon-chevron-right"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                    <a href="/" className="btn">VIEW FULL STANDINGS<i className="icon2 icon-chevron-right"></i></a>
                </div>
            </div>
        </div>
    );
};

export default HomeDriverStandings;