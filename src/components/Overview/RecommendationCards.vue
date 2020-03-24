<template>
    <div class="wrapper">
        <div v-for="state in stateConfig" :key="state.id" :class="[{ 'is-active': state.active }, 'custom-card']">
            <div :class="['custom-row-header', 'custom-row']">
                <div class="icon-column">
                    <i :class="[state.icon]"></i>
                </div>
                <div class="title-column">
                    <div class="title">{{ state.title }}</div>
                    <div class="subtitle">
                        {{ state.subtitle }}
                    </div>
                </div>
            </div>
            <div :class="['custom-row-content', 'custom-row']">
                <div class="description">{{ state.descriptionText }}</div>
            </div>
            <div class="custom-row-footer">
                <el-button @click="sendMail()" type="text">{{ state.button }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IDevice } from '../../typings/typings'
import { Vue, Component, Watch } from 'vue-property-decorator'

const defaultConfig = [
    {
        id: 1,
        cssName: 'anomaly-card',
        title: 'Initiate further steps',
        subtitle: '',
        icon: 'el-icon-s-promotion',
        button: 'Send Mail',
        descriptionText: 'Some of your devices have a critical state, inform your colleagues.',
        active: false,
    },
    {
        id: 2,
        cssName: 'good-card',
        title: 'No further steps necessary',
        subtitle: '',
        icon: 'el-icon-success',
        descriptionText: 'Everything is fine with the registered devices.',
        active: false,
    },
]

@Component({})
export default class RecommendationCards extends Vue {
    public stateConfig = defaultConfig

    get devices(): IDevice[] {
        return this.$store.getters.getDevices
    }

    @Watch('devices')
    public onDevicesChanged(): void {
        const urgent: IDevice[] = this.devices.filter((device: any) => device.state === 'urgent')
        const warning: IDevice[] = this.devices.filter((device: any) => device.state === 'warning')
        if (urgent.length !== 0 || warning.length !== 0) {
            this.stateConfig[0].active = true
            this.stateConfig[1].active = false
        } else {
            this.stateConfig[0].active = false
            this.stateConfig[1].active = true
        }
    }

    public sendMail(): void {
        const devices: IDevice[] = this.$store.getters.getFilteredDevices
        const urgent: IDevice[] = devices.filter((device: any) => device.state === 'urgent').slice(0, 10)
        const warning: IDevice[] = devices.filter((device: any) => device.state === 'warning').slice(0, 10)
        let link =
            'mailto:' +
            '?subject=' +
            'Critical state of devices' +
            '&body=Hello,' +
            escape('\n') +
            'there are some devices which need your attention. Below you can see the DeviceID of these devices.' +
            escape('\n\n')
        if (urgent.length > 0) {
            link = link + 'Urgent (' + urgent.length + ' device(s)):' + escape('\n')
            urgent.forEach((element: any) => {
                link = link + escape('\v') + '- ' + element.device_id + ' (ID: ' + element.id + ')' + escape('\n')
            })
        }
        if (warning.length > 0) {
            link = link + escape('\n') + 'Warning (' + warning.length + ' device(s)):' + escape('\n')
            warning.forEach((element: any) => {
                link = link + escape('\v') + '- ' + element.device_id + ' (ID: ' + element.id + ')' + escape('\n')
            })
        }

        window.location.href = link
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
    height: 250px;
    padding: 20px;
    margin: 0 10px 10px 0;
    background-color: white;
    border-radius: 4px;
    flex-direction: column;
    justify-content: space-between;
    display: none;

    &.is-active {
        display: flex;
    }
}

.custom-row-header {
    padding-top: 10px;
    height: 80px;

    .icon-column {
        color: $--color-primary;
        font-size: 30px;
        flex: 1;
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
            color: #8a8a8a;
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
    align-items: flex-end;
    font-size: 18px;
    padding: 0 10px;
    height: 40px;
    color: $--color-primary;
}

@media only screen and (max-width: 1200px) {
    .custom-card {
        width: 300px;
        height: 230px;
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
