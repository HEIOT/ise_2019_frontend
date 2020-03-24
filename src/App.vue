<template>
    <div id="app">
        <NavBar v-on:toggle-sidebar="toggleSideBar" />

        <div :class="[{ 'custom-app-content-collapse': isNavCollapse }, 'custom-app-content']">
            <div class="custom-page-content">
                <div v-if="this.$route.name === 'detail'" class="button-back">
                    <el-button @click="navigateBack" type="text" icon="el-icon-back">Back</el-button>
                </div>

                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import NavBar from '@/components/Overview/NavBar.vue'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
    components: { NavBar },
})
export default class App extends Vue {
    private isNavCollapse: boolean = false

    public toggleSideBar(isCollapse: boolean) {
        this.isNavCollapse = isCollapse
    }

    public navigateBack() {
        if (this.$route.name === 'detail') this.$router.push('/')
    }
}
</script>

<style lang="scss">
@import 'style/global.scss';

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #454545;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    background-color: #f4f5f7;
}

.custom-app-content {
    width: 100vw;
    padding-left: 150px;
    transition: all 0.2s ease-out;
}

.custom-app-content-collapse {
    padding-left: 64px;
}

.button-back {
    text-align: left;

    button {
        font-size: 24px;
    }
}

@media (max-width: 400px) {
    .custom-app-content-collapse {
        padding-left: 0;
    }
}
</style>
