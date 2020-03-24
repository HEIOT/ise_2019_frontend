<template>
    <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" height="500">
        <el-table-column prop="timestamp" :formatter="timeFormatter" sortable label="Date"></el-table-column>
        <el-table-column prop="attribute" label="Affected measure"></el-table-column>
        <el-table-column
            prop="type"
            label="Type"
            :filters="filterOptions"
            :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column label="Show Anomaly">
            <template slot-scope="scope">
                <el-button @click.native.prevent="showAnomaly(scope.$index, tableData)" type="primary" size="small">
                    Show
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { IAnomaly } from '../../typings/typings'

@Component({})
export default class DataTable extends Vue {
    @Prop(Array) public readonly tableData: IAnomaly[] | undefined

    public filterOptions: object[] = [
        { text: 'spike', value: 'spike' },
        { text: 'threshold', value: 'threshold' },
        { text: 'dropout', value: 'dropout' },
    ]
    private readonly timeOptions: object = { hour: 'numeric', minute: 'numeric', second: 'numeric' }
    @Emit()
    public showAnomaly(index: number, data: IAnomaly[]) {
        return data[index]
    }

    public timeFormatter(row: any, column: any, cellValue: any) {
        return cellValue.toLocaleDateString('en-US', this.timeOptions)
    }

    public dataFormatter(row: any, column: any, cellValue: any) {
        const key = column.property
        const data = row.data.find((r: any) => r.name === key)
        return data ? data.value : 'no value'
    }

    public filterHandler(value: any, row: any, column: any) {
        const property = column.property
        return row[property] === value
    }
}
</script>

<style lang="scss" scoped></style>
