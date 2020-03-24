<template>
    <div class="wrapper">
        <canvas ref="chartCanvasEl"></canvas>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'
import ChartColors from './chartColors.const'

import { IData, IDataComponentPayload } from '../../typings/typings'

@Component({
    components: {},
})
export default class BarChart extends Vue {
    @Prop(Object) public readonly data: IDataComponentPayload | undefined

    @Ref() public readonly chartCanvasEl!: HTMLCanvasElement
    public chartInstance: any = null

    constructor() {
        super()
    }

    @Watch('data')
    public onDataChanged(newVal: IData, oldVal: IData) {
        this.init()
    }

    public init() {
        this.generateGraph(this.data)
    }

    public generateGraph(data: IDataComponentPayload | undefined) {
        if (!data || !data.data.length) return !!this.chartInstance ? this.chartInstance.destroy() : null

        const datasets: any[] = this.generateBarGraphDataset(data)
        const labels: string[] = [data.data[0].date.toLocaleTimeString()]

        if (!!this.chartInstance) this.chartInstance.destroy()
        this.chartInstance = new Chart(this.chartCanvasEl, {
            type: 'bar',
            data: {
                datasets,
                labels,
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        })
    }

    public generateBarGraphDataset(dataPayload: IDataComponentPayload) {
        if (!dataPayload || !dataPayload.data) return []
        const datasets: any[] = []
        const data = dataPayload.data[0]

        for (const dataPoint of data.data.sort((a, b) => a.name.localeCompare(b.name))) {
            datasets.push({
                label: dataPoint.name,
                data: [dataPoint.value],
                backgroundColor: dataPayload.namesWithColors[dataPoint.name],
                borderColor: dataPayload.namesWithColors[dataPoint.name],
                fill: false,
            })
        }
        return datasets
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
}
</style>
