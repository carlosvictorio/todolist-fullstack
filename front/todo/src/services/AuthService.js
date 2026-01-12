import HttpError from "../errors/HttpError";
import Cookies from "js-cookie";
class AuthService {
    async register(email, password) {
        const name = "";
        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new HttpError(
                data.message || "Something went wrong!",
                data.errors,
                response.status
            );
        }

        return data;
    }

    async login(email, password) {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new HttpError(
                data.message || "Something went wrong!",
                data.errors,
                response.status
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
