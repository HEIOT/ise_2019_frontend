<template>
    <div class="wrapper" v-if="visible">
        <div class="custom-card">
            <div :class="['custom-row-header', 'custom-row']">
                <div class="icon-column">
                    <img src="@/assets/logo.png" alt="HEIOT Logo" />
                </div>
                <div class="title-column">
                    <div class="title">Keep track of your devices.</div>
                    <div class="subtitle">This app works offline.</div>
                </div>
            </div>
            <div class="custom-row-footer">
                <el-link @click="visible = false" class="install-cancel">Not now</el-link>
                <el-button @click="installApp" class="install-button" round>Install</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class InstallCard extends Vue {
    private deferredPrompt: any
    private visible: boolean = false

    public created() {
        window.addEventListener('beforeinstallprompt', e => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault()
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e
            // Update UI notify the user they can install the PWA
            this.visible = true
        })
    }

    public installApp() {
        this.visible = false
        // Wait for the user to respond to the prompt
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt()
            // Wait for the user to respond to the prompt
            this.deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    this.visible = false
                } else {
                    this.visible = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/global.scss';
.wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.custom-card {
    width: 340px;
    height: auto;
    padding: 20px;
    margin: 0 10px 10px 0;
    background-color: $--color-primary;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    color: white;
}

.custom-row-header {
    padding-top: 10px;
    height: 80px;

    .icon-column {
        font-size: 30px;
        flex: 1;
        background: white;
        margin-right: 6px;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .title-column {
        flex: 3;
        text-align: left;
        .title {
            font-size: 20px;
            font-weight: bold;
        }
        .subtitle {
            font-size: 16px;
            color: $incontext_lightgrey;
        }
    }
    .description {
        text-align: left;
        flex: 1;
        padding: 10px 0px 0px 0px;
    }
}

.custom-row-content {
    text-align: left;
    font-size: 16px;
    height: 90px;
    padding: 0 10px;
}

.custom-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.custom-row-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-size: 18px;
    padding: 0 10px;
    height: 40px;

    * {
        margin: 6px;
    }

    .install-button {
        background: $incontext_lightgrey;
        color: $--color-primary;
    }
    .install-cancel {
        color: $incontext_lightgrey !important;
    }
}

@media only screen and (max-width: 1200px) {
    .custom-card {
        width: 300px;
        padding: 10px;
    }

    .custom-row-header {
        .title-column {
            .title {
                font-size: 18px;
            }
            .subtitle {
                font-size: 14px;
            }
        }
    }

    .custom-row-content {
        font-size: 14px;
    }
}
</style>
