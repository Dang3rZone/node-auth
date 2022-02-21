import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/user.entity";

export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    if (body.password !== body.confirmPassword) {
        return res.status(400).json({
            ok: false,
            message: "Passwords do not match"
        });
    }

    const user = await getRepository(User).save({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password
    });

    res.send(body);

};