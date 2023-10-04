import 'dotenv/config'
import jwt from 'jsonwebtoken';

const isRequestAuthorized = (token) => {
    if (!token) {
        return false;
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        return true;
    } catch (err) {
        return false;
    }
}

export default isRequestAuthorized;