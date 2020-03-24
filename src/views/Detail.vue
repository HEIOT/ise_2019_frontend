<template>
    <div>
        <div class="custom-subtitle">IoT-Device-Detail</div>
        <div class="custom-title">{{ deviceData.name }}</div>
        <div class="detail">
            <div class="custom-section-title device-profile-title">Device Profile</div>
            <div class="card">
                <div class="row head">
                    <div class="device-header">
                        <UpdateStateManually :currentState="deviceData.state" @change-state="changeDeviceState" />
                    </div>
                    <div class="button-group">
                        <el-tooltip effect="dark" content="edit device" placement="top">
                            <el-button
                                class="button edit"
                                circle
                                @click="drawer = true"
                                icon="el-icon-edit"
                                type="text"
                            />
                        </el-tooltip>
                        <el-tooltip effect="dark" content="delete device permanently" placement="top">
                            <el-button
                                class="button delete"
                                circle
                                type="text"
                                icon="el-icon-delete"
                                @click="confirmDelete()"
                            />
                        </el-tooltip>
                    </div>
                </div>
                <DeviceProfile
                    :id="deviceData.id"
                    :device_id="deviceData.device_id"
                    :state="deviceData.state"
                    :tags="deviceData.tags"
                    :master_data="deviceData.master_data"
                />
            </div>
        </div>
        <el-drawer title="Edit Device" size="50%" :visible.sync="drawer" :with-header="false">
            <DeviceEditor :originalDevice="deviceData" @device-updated="loadDevice" />
        </el-drawer>

        <DataAnalaysis class="data-analysis" :deviceId="deviceData.id"></DataAnalaysis>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import DeviceProfile from '@/components/Detail/DeviceProfile.vue'
import DeviceEditor from '@/components/Detail/DeviceEditor.vue'
import DataAnalaysis from '@/components/DataAnalysis/DataAnalysis.vue'
import UpdateStateManually from '@/components/Detail/UpdateStateManually.vue'
import axios from 'axios'
import { ITag, IMasterdata, ICategory, IDevice } from '../typings/typings'

@Component({
    components: { DeviceProfile, DeviceEditor, DataAnalaysis, UpdateStateManually },
})
export default class Detail extends Vue {
    public drawer = false
    public id: string = ''

    public created() {
        this.id = this.$route.params.id
        this.$store.dispatch('getTags')
        this.$store.dispatch('getMasterdataCategories')
        this.$store.dispatch('loadDevice', this.id)
    }

    public loadDevice() {
        this.$store.dispatch('loadDevice', this.id)
    }

    get deviceData(): IDevice {
        return this.$store.getters.getDeviceDetail
    }

    public deleteDevice(): void {
        this.$store
            .dispatch('deleteDevice', this.id)
            .then(() => {
                this.deleteSuccessMessage()
                this.$router.push({ path: '/' })
            })
            .catch(error => {
                this.$message({
                    message: error,
                    type: error,
                })
            })
    }

    public confirmDelete(): void {
        this.$confirm('This will permanently delete the device. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }).then(() => {
            this.deleteDevice()
        })
    }

    public changeDeviceState(newState: string) {
        const newDeviceState = { id: this.id, state: newState }
        this.$store
            .dispatch('changeState', newDeviceState)
            .then(() => {
                this.$message('State successfully updated')
                this.$store.dispatch('loadDevice', this.id)
            })
            .catch(error => {
                this.$message({
                    message: error,
                    type: error,
                })
            })
    }

    private deleteSuccessMessage() {
        this.$message('Device successfully deleted')
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/colours.scss';
.back {
    float: left;
}

.device-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.detail {
    margin-top: 50px;
    background-color: #f4f5f7;
    height: 100%;
    width: 100%;
    border: 1px solid #f4f5f7;
}

.card {
    width: 90%;
    margin: auto;
    padding: 20px 50px;
    background-color: #ffffff;
    border-radius: 5px;
}

.device-profile-title {
    width: 90%;
    margin: 30px auto;
}

.button {
    height: 55px;
    width: 55px;
    font-size: 1.5em;

    &.back {
        font-size: 1.5em;
    }

    &.edit {
        color: $__color-primary;
        &:hover {
            background-color: rgba($__color-primary, 0.4);
        }
    }

    &.delete {
        color: $__color-danger;
        &:hover {
            background-color: rgba($__color-danger, 0.4);
        }
    }
}

.head {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media only screen and (max-width: 1200px) {
    .back {
        margin-left: 30px;
    }
    .head {
        height: inherit;
    }
    .data-analysis {
        width: 100%;
    }
}

@media (max-width: 550px) {
    .device-header {
        flex-wrap: wrap;
        margin-top: 10px;
        flex-direction: column-reverse;
        align-items: flex-start;
    }
    .head {
        position: relative;
    }
    .button-group {
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>
