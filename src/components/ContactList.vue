<!-- <script>
export default {
    props: {
        contacts: { type: Array, default: [] }, activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(contact, index) in contacts" :key="contact._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ contact.name }}
        </li>
    </ul>
</template> -->
<script>
export default {
    props: {
        contacts: { type: Array, default: () => [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            console.log("Chọn liên hệ:", this.contacts[index]); // Debug
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(contact, index) in contacts" :key="contact._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ contact.name }} <span v-if="contact.favorite"></span>
        </li>
    </ul>
</template>

<style scoped>
.list-group-item {
    cursor: pointer;
}

.list-group-item.active {
    background-color: #007bff;
    color: white;
}
</style>