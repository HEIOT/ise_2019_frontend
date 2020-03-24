<template>
    <div class="custom-card">
        <FilterBar :defaultOptions="defaultOptions" />
        <el-row class="tables" v-if="deviceList && deviceList.length">
            <el-col>
                <ListTabs :tableData="deviceList" />
            </el-col>
        </el-row>
        <div class="no-data-info" v-else>
            There are currently no devices with this state.
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FilterBar from '@/components/FilterBar.vue'
import DeviceList from '@/components/DeviceList.vue'
import ListTabs from '@/components/ListTabs.vue'

@Component({
    components: {
        FilterBar,
        DeviceList,
        ListTabs,
    },
})
export default class StateOverviewSection extends Vue {
    get deviceList() {
        const activeCard = this.$store.getters.getActiveCard
        const devices = this.$store.getters.getFilteredDevices
        let filteredDevices = devices.filter((device: any) => device.state === activeCard)
        filteredDevices = filteredDevices.sort((one: any, two: any) => {
            if (one.id > two.id) return 1
            if (one.id < two.id) return -1
            return 0
        })

        return filteredDevices
    }

    get defaultOptions() {
        return this.$store.getters.getFilterOptions
    }
}
</script>

<style lang="scss" scoped>
.no-data-info {
    text-align: left;
    color: #8a8a8a;
}
</style>
