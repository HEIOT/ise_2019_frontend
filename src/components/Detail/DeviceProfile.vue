<template>
    <div class="device-profile">
        <div class="column">
            <div class="inner-column">
                <el-row class="row">
                    <div>ID:</div>
                </el-row>
                <el-row class="row">
                    <div>Device ID:</div>
                </el-row>
                <el-row class="row">
                    <div>State:</div>
                </el-row>
                <el-row class="row">
                    <div>Tags:</div>
                </el-row>
            </div>
            <div class="inner-column">
                <el-row class="row">
                    <div>{{ id }}</div>
                </el-row>
                <el-row class="row">
                    <div>{{ device_id }}</div>
                </el-row>
                <el-row class="row">
                    <div>{{ state }}</div>
                </el-row>
                <div v-if="tags && tags.length">
                    <div class="tags">
                        <el-tag class="tag" v-for="tag in tags">{{ tag }}</el-tag>
                    </div>
                </div>
                <div v-else>
                    <el-row><div>This device has no tags.</div></el-row>
                </div>
            </div>
        </div>
        <div class="column">
            <el-table :data="master_data" v-if="master_data && master_data.length" ref="deviceTable">
                <el-table-column
                    :key="masterDataColumns[0].id"
                    :prop="masterDataColumns[0].prop"
                    :label="masterDataColumns[0].label"
                    :min-width="masterDataColumns[0].width"
                ></el-table-column>
                <el-table-column
                    :key="masterDataColumns[1].id"
                    :prop="masterDataColumns[1].prop"
                    :label="masterDataColumns[1].label"
                    :min-width="masterDataColumns[1].width"
                ></el-table-column>
            </el-table>
            <div class="no-data-info" v-else>
                <div>This device has no masterdata.</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IDevice } from '../../typings/typings'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class DeviceProfile extends Vue {
    @Prop() public id: any

    @Prop() public device_id: any

    @Prop() public state: any

    @Prop(Array) public master_data: any

    @Prop(Array) public tags: any

    public masterDataColumns: any = [
        {
            prop: 'category_id',
            label: 'Category',
            width: '25',
        },
        {
            prop: 'value',
            label: 'Value',
            width: '25',
        },
        {
            prop: 'detail',
            label: 'Delete',
            width: '25',
        },
    ]

    public tagsColumns: any = [
        {
            prop: 'tagId',
            label: 'Tag',
            width: '25',
        },
        {
            prop: 'detail',
            label: 'Delete',
            width: '25',
        },
    ]
}
</script>

<style lang="scss" scoped>
.device-profile {
    display: flex;
    justify-content: space-evenly;
}

h2 {
    text-align: left;
    margin: 5px 0px;
}

p {
    text-align: left;
}

.row {
    margin-bottom: 20px;
}

.column {
    width: 50%;
    text-align: left;
    display: flex;
}

.inner-column {
    padding-right: 30px;
    min-width: 105px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
}

.tag {
    margin-right: 10px;
    margin-bottom: 10px;
}

@media (max-width: 550px) {
    .device-profile {
        flex-direction: column;
    }
    .column {
        width: 100%;
    }
}
</style>
