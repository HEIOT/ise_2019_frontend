<template>
    <div class="container">
        <div class="custom-section-title">
            Anomalies
            <span style="opacity: .6">
                | Count:
                <b>{{ anomalyData && anomalyData.length ? anomalyData.length : '0' }}</b>
            </span>
        </div>

        <AnomalyTable
            :tableData="anomalyData"
            @show-anomaly="showAnomaly"
            v-if="anomalyData && anomalyData.length"
        ></AnomalyTable>
        <!-- <p v-else style="text-align: left">No anomalies detected</p> -->

        <div class="custom-section-title" ref="dataAnalysisHeader">
            Data Analysis
            <span style="opacity: .6" v-if="deviceData.length">
                | Count:
                <b>{{ deviceData.length }}</b>
            </span>
        </div>
        <div class="custom-datetime">
            <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                @change="onTimeRangeChanged"
            ></el-date-picker>
        </div>

        <div class="wrapper">
            <div class="graph-wrapper">
                <LineChart :data="lineChartDataPayload" @data-selected="dataSelected"></LineChart>
            </div>
            <div class="graph-wrapper">
                <BarChart :data="barChartDataPayload"></BarChart>
            </div>
        </div>
        <div class="table-wrapper">
            <DataTable :tableData="deviceData"></DataTable>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import DataTable from './DataTable.vue'
import AnomalyTable from './AnomalyTable.vue'
import Chart from 'chart.js'
import ChartColors from './chartColors.const'

import { IData, IDataComponentPayload, IAnomaly } from '../../typings/typings'
import PickerOptions from './datapickerOptions.const'

@Component({
    components: {
        LineChart,
        BarChart,
        DataTable,
        AnomalyTable,
    },
})
export default class DataAnalysis extends Vue {
    get lineChartDataPayload(): IDataComponentPayload {
        return {
            data: this.deviceData,
            namesWithColors: this.dataPointNamesWithColor,
            anomaly: this.displayedAnomaly ? this.displayedAnomaly : undefined,
        }
    }

    get barChartDataPayload(): IDataComponentPayload {
        return {
            data: this.barChartData ? [this.barChartData] : [],
            namesWithColors: this.dataPointNamesWithColor,
        }
    }
    @Prop() public deviceId: number | undefined

    @Ref() public readonly dataAnalysisHeader!: HTMLElement

    public deviceData: IData[] = []
    public anomalyData: IAnomaly[] = []
    public dataPointNamesWithColor: { [key: string]: string } = {}
    public barChartData: IData | null = null

    public timeRange: Date[] = []
    public readonly weekMS: number = 3600 * 1000 * 24 * 7
    public readonly pickerOptions: any = PickerOptions

    private displayedAnomaly: IAnomaly | null = null
    private anomalyDisplayHourRange = 5

    @Watch('deviceId')
    public onDeviceIdChanged(newId: number, oldId: number) {
        this.loadDeviceData(true)
    }

    public onTimeRangeChanged() {
        if (!this.timeRange.length) return
        this.loadDeviceData()
    }

    public mounted() {
        this.loadDeviceData(true)
    }

    public showAnomaly(anomaly: IAnomaly) {
        this.displayedAnomaly = anomaly

        this.setAnomalyTimeRange(anomaly)
        this.loadDeviceData()
        this.dataAnalysisHeader.scrollIntoView()
    }

    public setAnomalyTimeRange(anomaly: IAnomaly) {
        const anomalyTime = anomaly.timestamp
        const dateBeforeAnomaly = new Date(anomalyTime.getTime())
        dateBeforeAnomaly.setHours(anomalyTime.getHours() - this.anomalyDisplayHourRange)
        const dateAfterAnomaly = new Date(anomalyTime.getTime())
        dateAfterAnomaly.setHours(anomalyTime.getHours() + this.anomalyDisplayHourRange)
        this.timeRange = [dateBeforeAnomaly, dateAfterAnomaly]
    }

    public async loadDeviceData(inital: boolean = false) {
        if (!this.deviceId) return
        this.barChartData = null

        if (!inital) {
            const { startDate, endDate } = this.getStartAndEndDateStrings()
            this.deviceData = await this.$store.dispatch('loadDeviceDataWithTimeRange', {
                deviceId: this.deviceId,
                startDate,
                endDate,
            })
        } else {
            this.loadAnomalyData()

            this.deviceData = await this.$store.dispatch('loadLatestDeviceData', {
                deviceId: this.deviceId,
            })
            this.setInitialTimeRange()
        }

        this.deviceData = this.deviceData.sort((a, b) => {
            return a.date.getTime() - b.date.getTime()
        })
        this.extractDataNamesAndAddColors(this.deviceData)
    }

    public async loadAnomalyData() {
        if (!this.deviceId) return

        this.anomalyData = await this.$store.dispatch('loadAllAnomalyDataById', {
            deviceId: this.deviceId,
        })
    }

    public dataSelected(data: IData) {
        this.barChartData = data
    }

    private getStartAndEndDateStrings() {
        const startDate = this.timeRange[0]
            .toISOString()
            .split('T')
            .join(' ')
        const endDate = this.timeRange[1]
            .toISOString()
            .split('T')
            .join(' ')

        return {
            startDate: startDate.substring(0, startDate.length - 5),
            endDate: endDate.substring(0, endDate.length - 5),
        }
    }

    private setInitialTimeRange() {
        const sortedTimes = this.deviceData.map(data => data.date).sort((a, b) => a.getTime() - b.getTime())
        this.timeRange = [sortedTimes[0], sortedTimes[sortedTimes.length - 1]]
    }

    private extractDataNamesAndAddColors(dataPoints: IData[]) {
        this.dataPointNamesWithColor = {}

        let index = 0
        for (const dataPoint of dataPoints) {
            for (const { name } of dataPoint.data) {
                if (!this.dataPointNamesWithColor[name]) {
                    this.dataPointNamesWithColor[name] = ChartColors[index++]
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 90%;
    margin: 30px auto;

    .el-date-editor {
        margin: 20px 0px;
    }

    .title {
        text-align: left;
        font-weight: bold;
        font-size: 50px;

        &-sub {
            text-align: left;
            font-weight: normal;
            font-size: 25px;
        }
    }

    .wrapper {
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 10px 0px;

        .graph-wrapper {
            flex-basis: 46%;
        }

        @media only screen and (max-width: 1400px) {
            justify-content: space-around;
            .graph-wrapper {
                flex-basis: 80%;
            }
        }
    }

    .count-display {
        text-align: left;
        margin: 20px 0px;
        font-size: 2em;
    }
}

@media (max-width: 400px) {
    .custom-datetime {
        display: flex;
    }
}
</style>
