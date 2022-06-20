<template>
Post Detail of {{ $route.params.id }}
<button @click="showID" type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2">Show ID</button>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const showID = () => {
    console.log("Post ID=", route.params.id)
    router.push("/")
}
</script>