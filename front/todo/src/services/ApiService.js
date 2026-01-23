import HttpError from "../errors/HttpError";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL;

class ApiService {
    constructor(baseUrl) {
        this.baseUrl = `${API_URL}${baseUrl}`;
    }

    async defaultFetch({ customPath, customMethod, bodyObject } = {}) {
        const token = Cookies.get("token");

        const path = customPath
            ? `${this.baseUrl}/${customPath}`
            : this.baseUrl;
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
                response.status,
            );
        }

        return data;
    }
}

export default ApiService;
