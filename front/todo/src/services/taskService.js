import HttpError from "../errors/HttpError";
import Cookies from "js-cookie";

class TaskService {
    async defaultFetch({ customPath, customMethod, bodyObject } = {}) {
        const token = Cookies.get("token");

        const path = customPath
            ? `http://localhost:8080/tasks/${customPath}`
            : "http://localhost:8080/tasks";
        const response = await fetch(path, {
            method: customMethod,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: bodyObject ? JSON.stringify(bodyObject) : undefined,
        });

        if (response.status === 204) return null;

        const data = await response.json();

        if (!response.ok) {
            throw new HttpError(
                data.message || "Something went wrong",
                response.status
            );
        }

        return data;
    }

    async createTask(name) {
        const response = await this.defaultFetch({
            customMethod: "POST",
            bodyObject: { name },
        });

        return response;
    }

    async getMyTasks() {
        const response = await this.defaultFetch({ customMethod: "GET" });
        return response;
    }

    async getTasksById(id) {
        const response = await this.defaultFetch({
            customPath: id,
            customMethod: "GET",
        });
        return response;
    }

    async updateTaskName(id, name) {
        const response = await this.defaultFetch({
            customPath: `${id}/name`,
            customMethod: "PATCH",
            bodyObject: { name },
        });
        return response;
    }

    async updateTaskStatus(id, status) {
        const response = await this.defaultFetch({
            customPath: `${id}/status`,
            customMethod: "PATCH",
            bodyObject: { status },
        });
        return response;
    }

    async deleteTask(id) {
        const response = await this.defaultFetch({
            customPath: id,
            customMethod: "DELETE",
        });
    }
}

const taskService = new TaskService();
export default taskService;
