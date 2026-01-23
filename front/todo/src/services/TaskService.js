import ApiService from "./ApiService";

class TaskService {
    api = new ApiService("/tasks");

    async createTask(name) {
        const response = await this.api.defaultFetch({
            customMethod: "POST",
            bodyObject: { name },
        });
        return response;
    }

    async getMyTasks() {
        const response = await this.api.defaultFetch({ customMethod: "GET" });
        return response;
    }

    async getTasksById(id) {
        const response = await this.api.defaultFetch({
            customPath: id,
            customMethod: "GET",
        });
        return response;
    }

    async updateTaskName(id, name) {
        const response = await this.api.defaultFetch({
            customPath: `${id}/name`,
            customMethod: "PATCH",
            bodyObject: { name },
        });
        return response;
    }

    async updateTaskStatus(id, status) {
        const response = await this.api.defaultFetch({
            customPath: `${id}/status`,
            customMethod: "PATCH",
            bodyObject: { status },
        });
        return response;
    }

    async deleteTask(id) {
        const response = await this.api.defaultFetch({
            customPath: id,
            customMethod: "DELETE",
        });
    }
}

const taskService = new TaskService();
export default taskService;
