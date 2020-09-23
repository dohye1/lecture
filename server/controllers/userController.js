import User from '../model/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const departmentArr = [
  '소속대학',
  '인문대학',
  '사회과학대학',
  '자연과학대학',
  '경상대학',
  '법과대학',
  '공과대학',
  '농업생명과학대학',
  '사범대학',
  '예술대학',
  '치과대학',
  '수의과대학',
  '생활과학대학',
  'IT대학',
  '약학대학',
  '행정학부'
];

export const postRegister = async (req, res) => {
  const {
    body: { Name, Email, Department, IdNum, Password, Role }
  } = req;

  try {
    // db에 동일한 이메일, 학번이 있는지 체크
    const userCheck = await User.findOne({ Email, IdNum });
    if (userCheck !== null) {
      return res.status(400).json({ register: false, reason: 'email' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);
    const newUser = await User.create({
      name: Name,
      email: Email,
      department: departmentArr[parseInt(Department)],
      id_num: parseInt(IdNum),
      password: hash,
      role: parseInt(Role)
    });
    if (newUser) {
      return res.status(200).json({ register: true });
    } else {
      return res.status(400).json({ register: false });
    }
  } catch (error) {
    console.log(error);
  }
};

export const postLogin = async (req, res) => {
  const {
    body: { email, password }
  } = req;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ login: false });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      // 로그인성공했으면 jwt으로 토큰만들기
      const token = jwt.sign(user._id.toString(), process.env.SECRET_TOKEN);
      user.token = token;
      await user.save();
      return res
        .cookie('x_auth', user.token)
        .status(200)
        .json({ login: true, user: user._id });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLogout = async (req, res) => {
  const {
    user: { _id }
  } = req;
  try {
    const user = await User.findByIdAndUpdate({ _id }, { token: '' });
    if (user) {
      return res.clearCookie('x_auth').status(200).json({ logout: true });
    }
    return res.status(400).json({ logout: false });
  } catch (error) {
    console.log(error);
  }
};

export const postEditProfile = (req, res) => {
  console.log(req);
};

export const getAuth = (req, res) => {
  const {
    user: { _id, name, email, department, id_num, role, classes }
  } = req;

  return res.status(200).json({
    user: { id: _id, name, email, department, id_num, role, classes },
    isAuth: true
  });
};
