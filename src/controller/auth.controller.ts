import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import {sign, verify} from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    if (body.password !== body.confirmPassword) {
        return res.status(400).send({
            message: "Passwords do not match"
        });
    }

    const {password, ...userData} = await getRepository(User).save({
        password: await bcryptjs.hash(body.password, 12),
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
    });

    res.send(userData);

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
    }, process.env.ACCESS_SECRET || '', {expiresIn: "30s"});

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 24 * 60 * 60,
    });

    const refreshToken = sign({
        id: user.id,
    }, process.env.REFRESH_SECRET || '', {expiresIn: "1w"});

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 24 * 60 * 60 * 7,
    });

    res.send({message: "Logged in"});
};

export const AuthenticateUser = async (req: Request, res: Response) => {
    try {


        const cookie = req.cookies["refresh_token"];

        const payload: any = await verify(cookie, process.env.REFRESH_SECRET || '');

        if (!payload) {
            return res.status(401).send({
                message: "Invalid token"
            });
        }
        const user = await getRepository(User).findOne({
            where: {
                id: payload.id
            }
        });

        if (!user) {
            return res.status(401).send({
                message: "Invalid user"
            });
        }

        const {password, ...userData} = user;

        res.send(userData);
    } catch (e) {
        res.status(401).send({
            message: "Invalid token"
        });
    }
}

export const RefreshToken = async (req: Request, res: Response) => {
    try {
        const cookie = req.cookies["refresh_token"];

        const payload: any = await verify(cookie, process.env.REFRESH_SECRET || '');

        if (!payload) {
            return res.status(401).send({
                message: "Invalid token"
            });
        }

        const accessToken = sign({
            id: payload.id,
        }, process.env.ACCESS_SECRET || '', {expiresIn: "30s"});

        res.send({message: "Token refreshed"});
    } catch (e) {
        res.status(401).send({
            message: "Invalid token"
        });
    }
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie("access_token", '', {maxAge: 0});
    res.cookie("refresh_token", '', {maxAge: 0});

    res.send({message: "Logged out"});
}