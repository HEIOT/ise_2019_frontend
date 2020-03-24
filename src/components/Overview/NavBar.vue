<template>
    <div>
        <el-button class="custom-nav-mobile-button" v-if="onMobile" @click="toggleCollapse" round type="plain">
            <i v-if="!isCollapse" class="el-icon-close"></i>
            <i v-if="isCollapse" class="el-icon-menu"></i>
            Menu
        </el-button>
        <div :class="[{ 'custom-nav-wrapper-collapse': onMobile && isCollapse }, 'custom-nav-wrapper']">
            <el-menu
                class="el-menu-vertical-demo custom-sidebar"
                :default-active="activeItem"
                :collapse-transition="false"
                :router="true"
                :collapse="isCollapse"
            >
                <img :class="['logo']" src="@/assets/logo.png" alt="HEIOT Logo" />

                <el-menu-item @click="toggleCollapse" :class="[{ 'arrow-collapse': isCollapse }, 'arrow']">
                    <i class="el-icon-arrow-left"></i>
                </el-menu-item>
                <el-menu-item
                    class="custom-menu-item"
                    :index="item.route"
                    v-for="item in navBarConfig"
                    :key="item.name"
                >
                    <i :class="[item.icon]"></i>
                    <span slot="title">{{ item.text }}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

const defaultConfig = [
    {
        route: '/',
        name: 'home',
        text: 'Overview',
        icon: 'el-icon-s-data',
        active: false,
    },
    {
        route: '/register',
        name: 'register',
        text: 'Register Device',
        icon: 'el-icon-circle-plus',
        active: false,
    },
    {
        route: '/management',
        name: 'management',
        text: 'Management',
        icon: 'el-icon-s-management',
        active: false,
    },
]

@Component({})
export default class NavBar extends Vue {
    public navBarConfig = defaultConfig
    private isCollapse: boolean = false
    private activeItem: string = '/'

    private onTablet: boolean = false
    private onMobile: boolean = false

    public created() {
        this.activeItem = this.$route.path
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }

    @Watch('$route', { immediate: true, deep: true })
    public onUrlChange(newVal: any) {
        this.activeItem = newVal.path
        if (newVal.name === 'detail') this.activeItem = '/'
    }

    public handleResize() {
        this.onTablet = window.innerWidth < 1200
        this.onMobile = window.innerWidth < 400
        this.isCollapse = this.onMobile || this.onTablet
        this.changeMainContentPosition(this.isCollapse)
    }

    public destroyed() {
        window.removeEventListener('resize', this.handleResize)
    }

    public toggleCollapse() {
        this.isCollapse = !this.isCollapse
        this.changeMainContentPosition(this.isCollapse)
    }

    private changeMainContentPosition(message: boolean) {
        if (!this.onMobile) this.$emit('toggle-sidebar', message)
        if (this.onMobile) this.$emit('toggle-sidebar', true)
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/global.scss';

.custom-nav-wrapper {
    position: absolute;
    z-index: 99;
    left: 0;
    transition: left 0.5s;

    .custom-menu-item {
        text-align: left;
        font-size: 16px;
        &:focus {
            background: transparent;
        }
    }
}

.custom-nav-wrapper-collapse {
    left: -100%;
}

.custom-sidebar {
    position: fixed;
    height: 100%;
}

.custom-nav-mobile-button {
    position: fixed;
    right: 16px;
    top: 16px;
    z-index: 99;
}

.logo {
    width: 70%;
    height: auto;
    transition: all 0.5s;
}

.arrow {
    width: inherit;
    -webkit-transition: transform 0.5s;
    -moz-transition: transform 0.5s;
    -o-transition: transform 0.5s;
    transition: transform 0.5s;
}

.arrow-collapse {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
}
</style>
