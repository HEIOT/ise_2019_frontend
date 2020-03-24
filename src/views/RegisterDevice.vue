<template>
    <div>
        <div class="custom-subtitle">IoT-Devices</div>
        <div class="custom-title">Register device</div>
        <!--<div class="custom-subtitle">Integrate new devices into your IoT-platform</div>-->
        <div :class="['custom-card', 'spacing-top-small']">
            <el-form ref="device" label-width="110px" label-position="left" :rules="rules" :model="device">
                <div :class="['custom-section-title', 'no-spacing-top']">Basic attributes</div>
                <el-form-item prop="device_id" class="mandatory-form">
                    <span slot="label">Device ID</span>
                    <el-input
                        placeholder="Device ID"
                        v-model="device.device_id"
                        type="text"
                        :maxlength="stringLength"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="Device Name" prop="name" class="mandatory-form">
                    <el-input
                        placeholder="Device Name"
                        v-model="device.name"
                        type="text"
                        :maxlength="stringLength"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <div class="form-group-wrapper">
                    <div :class="['custom-section-title', 'form-group-header']">
                        Masterdata
                        <el-button type="primary" class="add-button" @click="activateDrawer('masterData')">
                            Add Masterdata
                            <i class="el-icon-plus el-icon-right"></i>
                        </el-button>
                    </div>
                    <ManageDeviceMasterdata
                        :categories="categories"
                        v-model="device.master_data"
                        ref="masterdatamanager"
                    />
                </div>
                <div class="form-group-wrapper">
                    <div :class="['custom-section-title', 'form-group-header']">
                        Tags
                        <el-button type="primary" class="add-button" @click="activateDrawer('tag')">
                            Add Tag
                            <i class="el-icon-plus el-icon-right"></i>
                        </el-button>
                    </div>
                    <ManageDeviceTags :tagOptions="tags" v-model="device.tags" />
                </div>
                <div class="custom-footer">
                    <el-button class="cancel button" type="text" @click="reset()">Cancel</el-button>
                    <el-button type="success" :disabled="enableRegisterButton()" plain @click="submitForm('device')">
                        Register
                    </el-button>
                </div>
            </el-form>
            <el-drawer :visible.sync="tagDrawer" size="30%" title="Add new tags">
                <div class="custom-drawer-content">
                    <ManageTags />
                </div>
            </el-drawer>
            <el-drawer :visible.sync="masterDataDrawer" size="30%" title="Add new masterdata categories">
                <div class="custom-drawer-content">
                    <ManageMasterDataCategory />
                </div>
            </el-drawer>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'

import { CategoriesMock, MockTags } from '@/components/mockData'
import ManageDeviceMasterdata from '@/components/ManageDevice/Masterdata.vue'
import ManageDeviceTags from '@/components/ManageDevice/Tags.vue'
import ManageMasterDataCategory from '@/components/ManageDevice/ManageMasterdataCategory.vue'
import ManageTags from '@/components/ManageDevice/ManageTags.vue'

import { IDevice, ITag } from '../typings/typings'
import { ElForm } from 'element-ui/types/form'
import ManageMasterdata from '../components/ManageDevice/Masterdata.vue'

@Component({
    components: {
        ManageDeviceMasterdata,
        ManageDeviceTags,
        ManageMasterDataCategory,
        ManageTags,
    },
})
export default class RegisterDevice extends Vue {
    get categories() {
        return this.$store.getters.getMasterDataCategories
    }

    get tags() {
        return this.$store.getters.getTags
    }

    @Ref() public readonly masterdatamanager!: ManageDeviceMasterdata

    public readonly stringLength = 30 // max valid string input due to database limitations

    public device: IDevice = {} as IDevice

    /*
    Rules are required for form validation
    */
    public rules = {
        device_id: [{ required: true, message: 'Please enter a device-id' }],

        name: [{ required: true, message: 'Please enter a name' }],
    }

    private masterDataArray: object[] = []

    private tagDrawer = false // manages drawer visibility for tags
    private masterDataDrawer = false // manages drawer visiblity for masterdata
    constructor() {
        super()
        this.getCategoriesFromStore()
        this.getTagsFromStore()
    }

    public enableRegisterButton(): boolean {
        if (this.device.device_id && this.device.name) {
            return false
        } else {
            return true
        }
    }

    public activateDrawer(drawer: string): void {
        switch (drawer) {
            case 'masterData':
                this.masterDataDrawer = true
                break
            case 'tag':
                this.tagDrawer = true
                break
            default:
                break
        }
    }

    public created() {
        /*  */
        this.$store.commit('setExcludedCategories', [])
    }

    public reset() {
        const ref: any = this.$refs.device
        ref.resetFields()
        this.masterdatamanager.reset()
        this.device = {} as IDevice
    }

    public getTagsFromStore(): void {
        this.$store.dispatch('getTags')
    }

    public getCategoriesFromStore(): void {
        this.$store.dispatch('getMasterdataCategories')
    }

    public submitForm(formName: any) {
        ;(this.$refs[formName] as ElForm).validate((valid: boolean) => {
            if (valid) {
                this.registerDevice()
            } else {
                return false
            }
        })
    }
    public registerDevice(): void {
        this.masterdatamanager.addMasterdataEntry()
        this.$store
            .dispatch('registerDevice', this.device)
            .then(() => {
                this.reset()
                this.successMessage()
            })
            .catch((error: any) => {
                this.$message({
                    message: error.response.data.message,
                    type: error,
                })
            })
        this.$store.commit('setExcludedCategories', [])
    }

    private successMessage() {
        this.$message('Device successfully registered')
    }
}
</script>

<style lang="scss" scoped>
.custom-max-width {
    max-width: 800px;
}

.no-spacing-top {
    margin-top: 0;
}

.form-group-header {
    display: flex;
    justify-content: space-between;
}

.custom-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
}

.custom-drawer-content {
    position: absolute;
    top: 80px;
    bottom: 0;
    width: 100%;
    overflow: auto;
}
</style>
