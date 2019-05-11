import React from 'react';

const FormField = ({formdata, change, id}) => {
    const showError = () => {
        let errorMessage = null;
        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="invalid-feedback">{formdata.validationMessage}</div>
            )
        }

        return errorMessage;
    };

    const renderTemplate = () => {
        let formTemplate = null;
        let wrapperClasses, inputClasses, value;
        switch(formdata.element){
            case 'input':
                wrapperClasses = (formdata.validation && !formdata.valid) ? "form-group has-danger" : "form-group";
                inputClasses = (formdata.validation && !formdata.valid && formdata.touched) ? "form-control is-invalid" : "form-control";
                value = formdata.value !== undefined ? formdata.value : '';
                formTemplate = (
                    <div className={wrapperClasses}>
                        {
                            formdata.showLabel ? <label className="form-control-label" htmlFor={id}>{formdata.config.label}</label> : null
                        }
                        <input
                            {...formdata.config}                            
                            value={value} 
                            className={inputClasses}
                            onBlur={(event) => {change({event, id, blur: true})}}
                            onChange={(event) => change({event, id})}
                            id={id} 
                        />
                        { showError() }
                    </div>
                )
            break;
            case 'select':
                wrapperClasses = (formdata.validation && !formdata.valid) ? "form-group has-danger" : "form-group";
                inputClasses = (formdata.validation && !formdata.valid && formdata.touched) ? "custom-select is-invalid" : "custom-select";
                value = formdata.value !== undefined ? (typeof formdata.value === 'string' ? formdata.value : formdata.value.id) : '';
                formTemplate = (
                    <div className={wrapperClasses}>
                        {
                            formdata.showLabel ? <label className="form-control-label" htmlFor={id}>{formdata.config.label}</label> : null
                        }
                        <select
                            className={inputClasses}
                            value={value}
                            onBlur={(event) => { change({ event, id, blur: true }) }}
                            onChange={(event) => change({ event, id })}
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map((item) => (
                                    <option
                                        key={item.key}
                                        value={item.key}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        { showError() }
                    </div>
                )                    
            break;
            default: 
                formTemplate = null;
        }

        return formTemplate;
    };

    return (
        <React.Fragment>
            { renderTemplate() }
        </React.Fragment>
    );
};

export default FormField;