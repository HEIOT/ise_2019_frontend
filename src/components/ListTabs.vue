<template>
    <div class="wrapper">
        <el-tabs tab-position="top" v-model="activeTab">
            <el-tab-pane label="All Devices" name="all">
                <div class="grid-content">
                    <!-- to change backgroundColor
                    v-bind:style="{ backgroundColor: color }"-->
                    <DeviceList :tableData="tableData" />
                </div>
            </el-tab-pane>
            <el-tab-pane
                :label="uppercaseFirstLetter(anomaly)"
                :name="anomaly"
                v-for="anomaly in anomalyTypes"
                :key="anomaly"
            >
                <DeviceList :tableData="filterTabledata(anomaly)" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import DeviceList from '@/components/DeviceList.vue'
import { IDevice } from '@/typings/typings'

@Component({
    components: {
        DeviceList,
    },
})
export default class ListTabs extends Vue {
    @Prop() public tableData: IDevice[] | undefined

    public activeTab: string = 'all'

    @Watch('tableData')
    public onTableDataChange() {
        this.activeTab = 'all'
    }

    get anomalyTypes() {
        if (!this.tableData) return []
        return Object.keys(
            this.tableData.reduce((acc: any, device: IDevice) => {
                if (!device.anomaly) return acc
                return {
                    ...acc,
                    [device.anomaly.type]: 1,
                }
            }, {})
        )
    }

    get activeCard() {
        return this.$store.getters.getActiveCard
    }
    public filterTabledata(anomaly: string) {
        if (!this.tableData) return []
        return this.tableData.filter(data => !!data.anomaly && data.anomaly.type === anomaly)
    }

    public uppercaseFirstLetter(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}
</script>

<style lang="scss" scoped></style>
