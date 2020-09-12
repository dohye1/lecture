import jwt from 'jsonwebtoken';
import User from '../model/User';

const auth = async (req, res, next) => {
    const { cookies: { x_auth } } = req;
    try {
        // 유저id가 담긴다
        const decoded = jwt.verify(x_auth, process.env.SECRET_TOKEN);

        // db에서 userid랑 token 과 동일한 user를 찾는다
        const user = await User.findOne({ _id: decoded, token: x_auth });
        if (!user) {
            return res.json({ isAuth: false, error: true });
        }
        req.token = x_auth;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;