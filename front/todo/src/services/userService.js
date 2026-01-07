import HttpError from "../errors/HttpError";
import Cookies from "js-cookie";

class UserService {
    async defaultFetch({ customPath, customMethod, bodyObject } = {}) {
        const token = Cookies.get("token");

        const path = customPath
            ? `http://localhost:8080/users/${customPath}`
            : "http://localhost:8080/users";

        const response = await fetch(path, {
            method: customMethod,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: bodyObject ? JSON.stringify(bodyObject) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new HttpError(
                data.message || "Something went wrong!",
                response.status
            );
        }

        return data;
    }

    async getAllUsers() {
        const response = await this.defaultFetch({ customMethod: "GET" });
        return response;
    }

    async getById(id) {
        const response = await this.defaultFetch({
            customPath: id,
            customMethod: "GET",
        });
        return response;
    }

    async getMe() {
        const response = await this.defaultFetch({
            customPath: "me",
            customMethod: "GET",
        });
        return response;
    }

    async updateById(id, userObject) {
        const response = await this.defaultFetch({
            customPath: id,
            customMethod: "PATCH",
            bodyObject: userObject,
        });
        return response;
    }

    async updateMe(userObject) {
        const response = await this.defaultFetch({
            customPath: "me",
            customMethod: "PATCH",
            bodyObject: userObject,
        });
        return response;
    }

    async deleteById(id) {
        const response = await this.defaultFetch({
            customPath: id,
            customMethod: "DELETE",
        });
        return response;
    }

    async deleteMe() {
        const response = await this.defaultFetch({
            customPath: "me",
            customMethod: "DELETE",
        });
        return response;
    }
}

const userService = new UserService();
export default userService;
