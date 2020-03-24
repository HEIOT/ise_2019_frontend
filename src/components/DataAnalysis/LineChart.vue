<template>
    <div class="wrapper">
        <canvas ref="chartCanvasEl"></canvas>
        <p style="opacity: .5">
            <i class="el-icon-info"></i>
            Click on the datapoints to see a detailed view of the data
        </p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import Chart from 'chart.js'

import { IData, IDataComponentPayload } from '../../typings/typings'

@Component({
    components: {},
})
export default class LineChart extends Vue {
    @Prop(Object) public readonly data: IDataComponentPayload | undefined

    @Ref() public readonly chartCanvasEl!: HTMLCanvasElement
    public chartInstance: any = null

    private standardPointRadius = 2
    private highlightPointRadius = 5

    constructor() {
        super()

        Chart.defaults.LineWithLine = Chart.defaults.line
        Chart.controllers.LineWithLine = Chart.controllers.line.extend({
            draw(ease: any) {
                Chart.controllers.line.prototype.draw.call(this, ease)

                if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                    const activePoint = this.chart.tooltip._active[0]
                    const ctx = this.chart.ctx
                    const x = activePoint.tooltipPosition().x
                    const topY = this.chart.scales['y-axis-0'].top
                    const bottomY = this.chart.scales['y-axis-0'].bottom

                    // draw line
                    ctx.save()
                    ctx.beginPath()
                    ctx.moveTo(x, topY)
                    ctx.lineTo(x, bottomY)
                    ctx.lineWidth = 2
                    ctx.strokeStyle = '#AAA'
                    ctx.stroke()
                    ctx.restore()
                }
            },
        })
    }

    @Watch('data')
    public onDataChanged(newVal: IData[], oldVal: IData[]) {
        this.generateGraph()
    }

    public mounted() {
        this.generateGraph()
    }

    public generateGraph(): void {
        if (!this.data) return
        const datasets: any[] = this.generateDataset(this.data)
        const labels: string[] = this.data.data.map(data => data.date.toLocaleTimeString())

        if (!!this.chartInstance) this.chartInstance.destroy()
        this.chartInstance = new Chart(this.chartCanvasEl, {
            type: 'LineWithLine',
            data: {
                datasets,
                labels,
            },
            options: {
                onClick: this.dataPointClicked,
                tooltips: {
                    intersect: false,
                    enabled: false,
                },
                responsive: true,
                hover: {
                    onHover(e: any) {
                        e.target.style.cursor = 'pointer'
                    },
                },
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

    public generateDataset(data: IDataComponentPayload): any[] {
        if (!data || !data.data.length) return []

        const datasets: any[] = []
        for (const name of Object.keys(data.namesWithColors).sort()) {
            datasets.push({
                label: name,
                data: data.data.map(this.getValueByName(name)),
                backgroundColor: data.namesWithColors[name],
                borderColor: data.namesWithColors[name],
                fill: false,
                pointRadius:
                    data.anomaly && name === data.anomaly.attribute
                        ? this.highlightAnomaly(this.getIndexOfAnomaly(data))
                        : this.standardPointRadius,
                hidden: data.anomaly && data.anomaly.attribute && name !== data.anomaly.attribute,
            })
        }

        return datasets
    }

    public getValueByName(name: string): (dataItem: IData) => number {
        return (dataItem: IData) => {
            const foundData = dataItem.data.find(data => data.name === name)
            return foundData ? foundData.value : 0
        }
    }

    public dataPointClicked(event: any): void {
        if (!this.data || !this.data.data || !this.chartInstance.getDatasetMeta(0)) return
        if (this.clickEventOutsideDataView(event)) return
        this.dataSelected(this.data.data[this.getClickedDataIndex(event)])
    }

    @Emit()
    public dataSelected(data: IData) {
        return data
    }

    private getIndexOfAnomaly(data: IDataComponentPayload): number | null {
        if (!data.anomaly) return null
        const anomalyDate = new Date(data.anomaly.timestamp)
        return data.data.findIndex(dataPoint => dataPoint.date.getTime() === anomalyDate.getTime())
    }

    private highlightAnomaly(index: number | null): (context: any) => number {
        return (context: any) =>
            !!index && context.dataIndex === index ? this.highlightPointRadius : this.standardPointRadius
    }
    private clickEventOutsideDataView(event: any): boolean {
        const dataStartY = this.chartInstance.getDatasetMeta(0).controller._yScale._startPixel
        // dataEndY can be used to disallow click event on labels
        // const dataEndY = this.chartInstance.getDatasetMeta(0).controller._yScale._endPixel
        return event.layerY <= dataStartY // || event.layerY >= dataEndY
    }

    private getClickedDataIndex(event: any): number {
        const points = this.chartInstance.getDatasetMeta(0).data
        const pointXAxis = points.map((element: any) => element._model.x)
        const distances = pointXAxis.map((xValue: number) => Math.abs(event.layerX - xValue))
        const indexOfLowest = distances.reduce(
            (lowest: number, next: number, index: number, src: number[]) => (next < src[lowest] ? index : lowest),
            0
        )

        return indexOfLowest
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    width: 100%;
}
</style>
