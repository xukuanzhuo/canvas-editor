import * as echarts from 'echarts'
import { Draw } from '../../../Draw'
import { IRowElement } from '../../../../../interface/Row'

export class ChartBlock {
  private element: IRowElement
  private draw: Draw

  constructor(element: IRowElement, draw: Draw) {
    this.element = element
    this.draw = draw
  }

  public render(blockItemContainer: HTMLDivElement) {
    // const block = this.element.block!
    // console.log('chartBlock element', this.element);
    this.draw
    const chartContainer = document.createElement('div')
    chartContainer.style.width = `${this.element.width || 400}px`
    chartContainer.style.height = `${this.element.height || 200}px`
    chartContainer.innerText = 'chart render...'

    blockItemContainer.append(chartContainer)

    setTimeout(() => {
      const chartIns = echarts.init(chartContainer)
      chartIns.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      })
    }, 100)
  }
}
