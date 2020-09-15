import Class from '../model/Class';

export const postProfessor = (req, res) => {
    console.log(req);
};

export const postStudent = (req, res) => {
    console.log(req);
};

export const getMy = async (req, res) => {
    const { user: { _id, role } } = req;
    try {
        let myLec;
        if (role === 1) {
            myLec = await Class.findOne({ professor_id: _id });
        } else {
            myLec = await Class.findOne({ student_id: _id });
        }
    } catch (error) {
        console.error(error);
    }
};