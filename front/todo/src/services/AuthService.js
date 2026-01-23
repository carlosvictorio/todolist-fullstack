import HttpError from "../errors/HttpError";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
    async register(email, password) {
        const name = "";
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new HttpError(
                data.message || "Something went wrong!",
                data.errors,
                response.status,
            );
        }

        return data;
    }

    async login(email, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new HttpError(
                data.message || "Something went wrong!",
                data.errors,
                response.status,
            );
        }

        Cookies.set("token", data.token);
        Cookies.set("roles", JSON.stringify(data.roles));

        return data;
    }

    logout() {
        Cookies.remove("token");
        Cookies.remove("roles");
    }
}

export const authService = new AuthService();
