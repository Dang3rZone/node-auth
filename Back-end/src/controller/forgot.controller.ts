import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Reset} from "../entity/reset.entity";
import {createTransport} from "nodemailer";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";

export const ForgotPassword = async (req: Request, res: Response) => {

    const {email} = req.body;
    const token = Math.random().toString(36).substring(2, 12);

    await getRepository(Reset).save({
        email,
        token,
    });

    const transporter = createTransport({
        host: '0.0.0.0',
        port: 1025,
    });

    const url = `http://localhost:3000/reset/${token}`;

    await transporter.sendMail({
        from: 'from@example.com',
        to: email,
        subject: 'Reset Password',
        html: `Click <a href="${url}">here</a> to reset your password.`,
    })

    res.send({
        message: 'Please check your email for a link to reset your password.',
    });
};

export const ResetPassword = async (req: Request, res: Response) => {

    const {token, password, password_confirm} = req.body;

    if (password !== password_confirm) {
        return res.status(400).send({
            message: 'Passwords do not match.',
        });
    }

    // get value from db
    const resetPassword = await getRepository(Reset).findOne({
        where: {
            token,
        },
    });

    if (!resetPassword) {
        return res.status(400).send({
            message: 'Invalid link.',
        });
    }

    const user = await getRepository(User).findOne({
        email: resetPassword.email,
    });

    if (!user) {
        return res.status(400).send({
            message: 'User not found.',
        });
    }
// update password and hash it
    await getRepository(User).update(user.id, {
        password: await bcryptjs.hash(password, 12),
    });

    res.send({
        message: 'Password reset successfully.',
    });
};