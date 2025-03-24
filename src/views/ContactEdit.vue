<!-- <template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="updateContact" @delete:contact="deleteContact" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async getContact(id) {
            try {
                this.contact = await ContactService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound nếu không tìm thấy liên hệ
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateContact(data) {
            try {
                await ContactService.update(this.contact._id, data);
                alert('Liên hệ được cập nhật thành công.');
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteContact() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ContactService.delete(this.contact._id);
                    this.$router.push({ name: "contactbook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getContact(this.id);
    },
};
</script> -->
<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm v-if="contact" :contact="contact" @submit:contact="updateContact"
            @delete:contact="deleteContact" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
    components: { ContactForm },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async getContact() {
            if (!this.id) return;
            try {
                const response = await ContactService.get(this.id);
                this.contact = response || {}; // Đảm bảo luôn có dữ liệu
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                this.$router.push({ name: "notfound" });
            }
        },
        async updateContact(data) {
            try {
                await ContactService.update(this.id, data);
                alert("Liên hệ được cập nhật thành công.");
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.error("Lỗi khi cập nhật:", error);
            }
        },
        async deleteContact() {
            if (confirm("Bạn có chắc muốn xóa?")) {
                try {
                    await ContactService.delete(this.id);
                    this.$router.push({ name: "contactbook" });
                } catch (error) {
                    console.error("Lỗi khi xóa:", error);
                }
            }
        },
    },
    created() {
        this.getContact();
    },
    watch: {
        id: "getContact", // Theo dõi nếu ID thay đổi (nếu có điều hướng)
    },
};
</script>
