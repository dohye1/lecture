import Class from '../model/Class';

export const getAll = async (req, res) => {
    try {
        const all = await Class.find();
        return res.status(200).json({ allClass: true, all })
    } catch (error) {
        console.error(error);
    }
};

export const getDepartment = (req, res) => {
    console.log(req);
};

export const getDetail = (req, res) => {
    console.log(req);
};

export const postNew = async (req, res) => {
    // 교수정보
    const { user: { _id, department }, body: { title, room, startTime, finishTime, stdMax, description, scoreType } } = req;
    try {
        const newClass = await Class.create({
            professor_id: _id,
            class_title: title,
            class_department: department,
            class_room: room,
            start_time: startTime,
            finish_time: finishTime,
            std_max: stdMax,
            description: description,
            score_type: scoreType
        })
        if (!newClass) { return res.status(200).json({ newClass: false }) };
        return res.status(200).json(newClass);
    } catch (error) {
        console.error(error);
    }
};

export const postEnroll = (req, res) => {
    console.log(req);
};