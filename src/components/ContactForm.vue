<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema" v-slot="{ values }">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="contactLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="contactLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">{{ isEditing ? "Cập nhật" : "Thêm mới" }}</button>
            <button v-if="isEditing" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
                Xóa
            </button>
            <button type="button" class="ml-2 btn btn-secondary" @click="cancel">
                Thoát
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import ContactService from "@/services/contact.service";

export default {
    components: { Form, Field, ErrorMessage },
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        return {
            contactLocal: { name: "", email: "", address: "", phone: "", favorite: false },
            contactFormSchema: yup.object().shape({
                name: yup.string()
                    .required("Tên không được để trống.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên tối đa 50 ký tự."),
                email: yup.string()
                    .email("E-mail không hợp lệ.")
                    .max(50, "E-mail tối đa 50 ký tự."),
                address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
                phone: yup.string()
                    .nullable()
                    .notRequired()
                    .matches(/^(?:\+84|0)(3|5|7|8|9)[0-9]{8}$/, "Số điện thoại không hợp lệ."),
            })
        };
    },
    computed: {
        isEditing() {
            return !!this.contact._id; // Kiểm tra có _id nghĩa là đang chỉnh sửa
        }
    },
    watch: {
        contact: {
            handler(newContact) {
                if (newContact && Object.keys(newContact).length > 0) {
                    this.contactLocal = { ...newContact };
                } else {
                    this.contactLocal = { name: "", email: "", address: "", phone: "", favorite: false };
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        async submitContact(values) {
            values.favorite = this.contactLocal.favorite ?? false;

            try {
                if (this.isEditing) {
                    // Nếu đang chỉnh sửa, cập nhật liên hệ
                    await ContactService.update(this.contactLocal._id, values);
                    console.log("Cập nhật liên hệ thành công!");
                } else {
                    // Nếu đang thêm mới, tạo liên hệ
                    await ContactService.create(values);
                    console.log("Thêm liên hệ thành công!");
                }

                this.$emit("submit:contact", values);
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.error("Lỗi khi gửi request:", error);
            }
        },
        async deleteContact() {
            if (window.confirm("Bạn có chắc muốn xóa liên hệ này không?")) {
                try {
                    await ContactService.delete(this.contactLocal._id);
                    this.$emit("delete:contact", this.contactLocal._id);
                    this.$router.push({ name: "contactbook" });
                } catch (error) {
                    console.error("Lỗi khi xóa liên hệ:", error);
                }
            }
        },
        cancel() {
            if (JSON.stringify(this.contact) === JSON.stringify(this.contactLocal) ||
                window.confirm("Bạn có thay đổi chưa lưu! Bạn có chắc muốn thoát?")) {
                this.$router.push({ name: "contactbook" });
            }
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
