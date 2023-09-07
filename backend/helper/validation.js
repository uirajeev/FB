import User from '../models/users.js'

export const validateEmail = email => {
    return email.toLowerCase().match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/);
}

export const validateLength = (text, min = 1, max = 100) => {
    if (text.length > max || text.length < min) {
        return false;
    }
    return true;
}

export const generateUsername = async userName => {
    let flage = false;
    let name = userName;

    do {
        let isUserName = await User.findOne({ username: name });
        if (isUserName) {
            name += (+new Date() * Math.random()).toString().substring(0, 1);
            flage = true;
        } else {
            flage = false;
        }

    } while (flage);
    return name;
}