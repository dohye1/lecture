import jwt from 'jsonwebtoken';
import User from '../model/User';

const auth = async (req, res, next) => {
    const { cookies: { x_auth } } = req;
    try {
        if (!x_auth) {
            return res.status(200).json({ isAuth: false })
        }
        // 유저id가 담긴다
        const decoded = jwt.verify(x_auth, process.env.SECRET_TOKEN);

        // db에서 userid랑 token 과 동일한 user를 찾는다
        const user = await User.findOne({ _id: decoded, token: x_auth });
        if (!user) {
            return res.status(200).json({ isAuth: false });
        }
        req.token = x_auth;
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
    }
}

export default auth;