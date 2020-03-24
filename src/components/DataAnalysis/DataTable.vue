<template>
    <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" height="600" style="width: 100%">
        <el-table-column prop="date" :formatter="timeFormatter" sortable label="Date" width="180"></el-table-column>
        <el-table-column label="Measures">
            <el-table-column
                :prop="measure"
                v-for="measure of dataColumns"
                :key="measure"
                :label="measure"
                :formatter="dataFormatter"
            ></el-table-column>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { IData, IDataFlat } from '../../typings/typings'

@Component({})
export default class DataTable extends Vue {
    @Prop(Array) public readonly tableData: IData[] | undefined
    @Prop(String) public search: string | undefined

    get filteredData() {
        if (!this.tableData) return []
        return this.tableData.filter(
            (data: IData) =>
                !this.search || data.data.map(value => value.name.toLowerCase()).includes(this.search.toLowerCase())
        )
    }

    get dataColumns() {
        if (!this.tableData) return []
        const retval: any = {}
        this.tableData.forEach(row => {
            row.data.forEach((data: any) => {
                retval[data.name] = 1
            })
        })
        return Object.keys(retval)
    }

    private readonly timeOptions: object = { hour: 'numeric', minute: 'numeric', second: 'numeric' }

    constructor() {
        super()
    }

    public dateFormatter(row: any, column: any, cellValue: any) {
        return cellValue.toLocaleDateString('en-US')
    }
    public timeFormatter(row: any, column: any, cellValue: any) {
        return cellValue.toLocaleDateString('en-US', this.timeOptions)
    }

    public dataFormatter(row: any, column: any, cellValue: any) {
        const key = column.property
        const data = row.data.find((r: any) => r.name === key)
        return data ? data.value : 'no value'
    }
}
</script>

<style lang="scss" scoped></style>
