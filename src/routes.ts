import {Router} from "express";
import {AuthenticateUser, Login, Logout, RefreshToken, Register} from "./controller/auth.controller";
import {Forgot} from "./controller/forgot.controller";

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthenticateUser);
    router.post('/api/refresh', RefreshToken);
    router.post('/api/logout', Logout);
    router.post('/api/forgot', Forgot
    );
};