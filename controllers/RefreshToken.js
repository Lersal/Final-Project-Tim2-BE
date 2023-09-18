import Users from "../model/UserModel.js";
import  Jwt  from "jsonwebtoken";

export const refreshToken = async( req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        Jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const email = user[0].email;
            const accessToken = Jwt.sign({userId, email}, process.env.ACCESS_TOKEN, {
                expiresIn: '15s'
            });
            res.json({ accessToken })
        });
    } catch (error) {
        console.log(error);
    }
}