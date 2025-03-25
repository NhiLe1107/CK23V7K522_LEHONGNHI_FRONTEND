<template>
    <div>
        <h2>Thêm Liên hệ</h2>
        <ContactForm :contact="contactData" @submitForm="addContact" />
    </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import contactService from "@/services/contact.service";

export default {
    components: { ContactForm },
    data() {
        return {
            contactData: {
                name: "",
                email: "",
                address: "",
                phone: "",
                favorite: false
            }
        };
    },
    methods: {
        async addContact(contactData) {
            try {
                await contactService.create(contactData);
                this.$router.push("/");
            } catch (error) {
                console.error("Lỗi khi thêm liên hệ:", error);
            }
        },
    },
};
</script>
