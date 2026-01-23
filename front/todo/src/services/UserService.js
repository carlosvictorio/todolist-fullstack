import ApiService from "./ApiService";

class UserService {
    api = new ApiService("/users");

    async getAllUsers() {
        const response = await this.api.defaultFetch({ customMethod: "GET" });
        return response;
    }

    async getById(id) {
        const response = await this.api.defaultFetch({
            customPath: id,
            customMethod: "GET",
        });
        return response;
    }

    async getMe() {
        const response = await this.api.defaultFetch({
            customPath: "me",
            customMethod: "GET",
        });
        return response;
    }

    async updateById(id, userObject) {
        const response = await this.api.defaultFetch({
            customPath: id,
            customMethod: "PATCH",
            bodyObject: userObject,
        });
        return response;
    }

    async updateMe(userObject) {
        const response = await this.api.defaultFetch({
            customPath: "me",
            customMethod: "PATCH",
            bodyObject: userObject,
        });
        return response;
    }

    async deleteById(id) {
        const response = await this.api.defaultFetch({
            customPath: id,
            customMethod: "DELETE",
        });
        return response;
    }

    async deleteMe() {
        const response = await this.api.defaultFetch({
            customPath: "me",
            customMethod: "DELETE",
        });
        return response;
    }
}

const userService = new UserService();
export default userService;
