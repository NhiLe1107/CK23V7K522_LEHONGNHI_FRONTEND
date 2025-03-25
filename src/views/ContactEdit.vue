<!-- <template>
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
                console.log("Dữ liệu nhận được:", response);
                if (response) {
                    this.contact = { ...response }; // Sao chép để không làm thay đổi trực tiếp
                } else {
                    this.contact = null;
                }
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
