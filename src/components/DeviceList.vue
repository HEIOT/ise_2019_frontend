<template>
    <div class="wrapper">
        <el-table :data="tableData" stripe ref="deviceTable">
            <el-table-column
                :key="tableColumns[0].id"
                :prop="tableColumns[0].prop"
                :label="tableColumns[0].label"
                :min-width="tableColumns[0].width"
            ></el-table-column>
            <el-table-column
                :key="tableColumns[1].id"
                :prop="tableColumns[1].prop"
                :label="tableColumns[1].label"
                :min-width="tableColumns[1].width"
            ></el-table-column>
            <el-table-column
                :key="tableColumns[2].id"
                :prop="tableColumns[2].prop"
                :label="tableColumns[2].label"
                :min-width="tableColumns[2].width"
            >
                <template slot-scope="scope">
                    <router-link :to="{ name: 'detail', params: { id: tableData[scope.$index].id } }">
                        <el-link :underline="false" class="to-details">
                            <i class="el-icon-info el-icon--right"></i>
                        </el-link>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class DeviceList extends Vue {
    @Prop() public tableData: any

    public tableColumns: any = [
        {
            prop: 'id',
            label: 'Id',
            width: '25',
        },
        {
            prop: 'name',
            label: 'Name',
            width: '75',
        },
        {
            prop: 'detail',
            label: 'Detail',
            width: '25',
        },
    ]

    get mobileFormat() {
        return this.$store.getters.getMobileFormat
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/colours.scss';
.wrapper {
    .no-data-info {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            color: #ff4444;
        }
    }

    .to-details {
        font-size: 24px;
    }
}
</style>
