import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import {sign} from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    if (body.password !== body.confirmPassword) {
        return res.status(400).send({
            message: "Passwords do not match"
        });
    }

    const user = await getRepository(User).save({
        password: await bcryptjs.hash(body.password, 12),
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
    });

    res.send(user);

};

export const Login = async (req: Request, res: Response) => {
    const body = req.body;

    const user = await getRepository(User).findOne({
        where: {
            email: body.email
        }
    });

    if (!user) {
        return res.status(400).send({
            message: "User not found"
        });
    }

    const isPasswordValid = await bcryptjs.compare(body.password, user.password);

    if (!isPasswordValid) {
        return res.status(400).send({
            message: "Invalid password"
        });
    }

    const accessToken = sign({
        id: user.id,
    }, "access_secret", {expiresIn: "30s"});

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 24 * 60 * 60,
    });

    const refreshToken = sign({
        id: user.id,
    }, "refresh_token", {expiresIn: "1w"});

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 24 * 60 * 60 * 7,
    });

    res.send({message: "Logged in"});
};