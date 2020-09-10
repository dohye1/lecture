import User from '../model/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const postRegister = async (req, res) => {
    const { body: { name, email, department, std_num, password, role } } = req;
    try {
        // db에 동일한 이메일, 학번이 있는지 체크
        const userCheck = await User.findOne({ email, std_num });
        if (userCheck !== null) { return res.status(400).json({ register: false, reason: 'email' }) }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name, email, department, std_num, password: hash, role
        })
        if (newUser) {
            return res.status(200).json({ register: true })
        } else {
            return res.status(400).json({ register: false, reason: 'fail' })
        }
    } catch (error) {
        console.log(error);
    }
};

export const postLogin = async (req, res) => {
    const { body: { email, password } } = req;
    try {
        const user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ login: false, reason: 'email' }) }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            // 로그인성공했으면 jwt으로 토큰만들기
            const token = jwt.sign(user._id.toString(), process.env.SECRET_TOKEN);
            user.token = token;
            await user.save();
            return res.cookie("x_auth", user.token).status(200).json({ login: true, user: user._id })
        }
    } catch (error) {
        console.log(error);
    }
};


export const getLogout = async (req, res) => {
    const { cookies: { x_auth } } = req;
    try {
        const userId = jwt.verify(x_auth, process.env.SECRET_TOKEN);
        const user = await User.findByIdAndUpdate(userId, { token: '' });
        if (user) {
            return res.status(200).json({ logout: true })
        }
        return res.status(400).json({ logout: false })
    } catch (error) {
        console.log(error);
    }
};


export const postEditProfile = (req, res) => {
    console.log(req);
};