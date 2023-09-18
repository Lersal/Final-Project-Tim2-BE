import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";


export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};

export const Register = async(req, res)=> {
    const {email, password, date_of_birth, phone_number, gender} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create ({
            email: email,
            password: hashPassword,
            date_of_birth: date_of_birth,
            phone_number: phone_number,
            gender: gender
        });
        res.json({msg:"Register berhasil"});
    } catch (error) {
        console.log(error);
    }
};


export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({msg: 'Wrong password'});
        const userId = user[0].id;
        const email = user[0].email;
        const accessToken = Jwt.sign({userId, email}, process.env.ACCESS_TOKEN, {
            expiresIn : '20s'
        });
        const refreshToken = Jwt.sign({userId, email}, process.env.REFRESH_TOKEN, {
            expiresIn : '1d'
        });

        await Users.update({refresh_token: refreshToken},{
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json ({accessToken});
        

    } catch (error) {
        console.log(error);
            res.status(404).json({msg: "Email tidak ditemukan"}) 
    }
};

export const Logout = async( req, res ) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(204);
        const userId = user [0].id;
        await Users.update( {refresh_token: null}, {
            where: {
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
};