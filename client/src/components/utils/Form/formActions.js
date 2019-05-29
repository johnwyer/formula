const resultSize = 5;

export const validate = (element, formdata = []) => {
    let error = [true, ''];

    //console.log('element ', element);
    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Password do not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error;
};

export const update = (element, formdata, formname) => {
    let id = element.id;
    let keys, newElement;
    const newFormdata = {
        ...formdata
    };

    if (id.includes('.')) {
        keys = id.split('.');
        newElement = {
            ...newFormdata[keys[0]][keys[1]]
        };
    } else {
        newElement = {
            ...newFormdata[id]
        };
    }

    newElement.value = element.event.target.value;
    if (element.blur) {
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    if (id.includes('.')) {
        newFormdata[keys[0]][keys[1]] = newElement;
    } else {
        newFormdata[id] = newElement;
    }

    return newFormdata;
};

export const generateData = (formdata, formname) => {
    let dataToSubmit = {};

    for (let key in formdata) {
        if (Object.keys(formdata[key]).length > resultSize) {
            if (key !== 'confirmPassword') {
                dataToSubmit[key] = formdata[key].value;
            }
        } else {
            dataToSubmit[key] = {};
            for (let key2 in formdata[key]) {
                dataToSubmit[key][key2] = formdata[key][key2].value;
            }
        }
    }

    return dataToSubmit;
};

export const isFormValid = (formdata, formname) => {
    let formIsValid = true;

    for (let key in formdata) {
        if (Object.keys(formdata[key]).length > resultSize) {
            //console.log(formdata[key], formdata[key].valid && formIsValid);
            formIsValid = formdata[key].valid && formIsValid;
        } else {
            for (let key2 in formdata[key]) {
                //console.log(formdata[key][key2], formdata[key][key2].valid && formIsValid);
                formIsValid = formdata[key][key2].valid && formIsValid;
            }
        }
    }

    return formIsValid;
};

export const resetFields = (formdata, formname) => {
    const newFormdata = {
        ...formdata
    };

    for (let key in newFormdata) {
        if (Object.keys(newFormdata[key]).length > resultSize) {
            if (key === 'images') {
                newFormdata[key].value = [];
            } else {
                newFormdata[key].value = '';
            }

            newFormdata[key].valid = false;
            newFormdata[key].touched = false;
            newFormdata[key].validationMessage = '';
        } else {
            for (let key2 in newFormdata[key]) {
                newFormdata[key][key2].valid = false;
                newFormdata[key][key2].touched = false;
                newFormdata[key][key2].validationMessage = '';
            }
        }
    }

    return newFormdata;
};

export const populateOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    const newFormdata = {
        ...formdata
    };

    arrayData.forEach((item) => {
        newArray.push({ key: item.id, value: item.name });
    });

    if (field.includes('.')) {
        let keys = field.split(".");
        newFormdata[keys[0]][keys[1]].config.options = newArray;
    } else {
        newFormdata[field].config.options = newArray;
    }

    return newFormdata;
};

export const populateFields = (formdata, fields) => {
    for (let key in formdata) {
        if (Object.keys(formdata[key]).length > resultSize) {
            formdata[key].value = fields[key];

            if (formdata[key].value !== "" || Object.keys(formdata[key].value).length !== 0) {
                formdata[key].valid = true;
                formdata[key].touched = true;
            } else {
                formdata[key].valid = false;
                formdata[key].touched = false;
            }

            formdata[key].validationMessage = '';
        } else {
            for (let key2 in formdata[key]) {
                //console.log(key, key2, formdata[key][key2].value);
                formdata[key][key2].value = fields[key][key2];

                if (formdata[key][key2].value !== "" || Object.keys(formdata[key][key2].value).length !== 0) {
                    formdata[key][key2].valid = true;
                    formdata[key][key2].touched = true;
                } else {
                    formdata[key][key2].valid = false;
                    formdata[key][key2].touched = false;
                }

                formdata[key][key2].validationMessage = '';
            }
        }
    }

    return formdata;
};