// import createApiClient from "./api.service";
// class ContactService {
// constructor(baseUrl = "/api/contacts") {
// this.api = createApiClient(baseUrl); }
// async getAll() {
// return (await this.api.get("/")).data;
//    }
//    async create(data) {
// return (await this.api.post("/", data)).data; }
// async deleteAll() {
// return (await this.api.delete("/")).data;
//    }
//    async get(id) {
// return (await this.api.get(`/${id}`)).data; }
// async update(id, data) {
// return (await this.api.put(`/${id}`, data)).data;
//    }
//    async delete(id) {
// return (await this.api.delete(`/${id}`)).data; }
// }
// export default new ContactService();

import createApiClient from "./api.service";

class ContactService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        try {
            return (await this.api.get("/")).data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách liên hệ:", error);
            throw error;
        }
    }

    async create(data) {
        try {
            return (await this.api.post("/", data)).data;
        } catch (error) {
            console.error("Lỗi khi tạo liên hệ:", error);
            throw error;
        }
    }

    async deleteAll() {
        try {
            return (await this.api.delete("/")).data;
        } catch (error) {
            console.error("Lỗi khi xóa tất cả liên hệ:", error);
            throw error;
        }
    }

    async get(id) {
        try {
            return (await this.api.get(`/${id}`)).data;
        } catch (error) {
            console.error(`Lỗi khi lấy liên hệ có ID ${id}:`, error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            return (await this.api.put(`/${id}`, data)).data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật liên hệ có ID ${id}:`, error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return (await this.api.delete(`/${id}`)).data;
        } catch (error) {
            console.error(`Lỗi khi xóa liên hệ có ID ${id}:`, error);
            throw error;
        }
    }
}

export default new ContactService();
