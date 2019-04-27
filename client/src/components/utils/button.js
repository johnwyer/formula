import React from 'react';
import { Link } from 'react-router-dom';


const MyButton = (props) => {
    const buttons = () => {
        let template = '';
        switch(props.type){
            case 'default':
                template = <Link className={!props.altClass ? 'btn btn-primary' : props.altClass } to={props.linkTo} {...props.addStyles}>{props.title}</Link>
            break;
            default: template = '';
        }
        return template;
    }

    return (
        <React.Fragment>
            {buttons()}
        </React.Fragment>
    );
};

export default MyButton;