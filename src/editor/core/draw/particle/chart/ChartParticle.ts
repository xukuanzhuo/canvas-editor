import * as echarts from 'echarts'
import { Draw } from '../../Draw'
import { IEditorOption } from '../../../../interface/Editor'
import { IElement } from '../../../../interface/Element'

export class ChartParticle {
  private draw: Draw
  protected options: Required<IEditorOption>
  protected imageCache: Map<string, HTMLImageElement>

  constructor(draw: Draw) {
    this.draw = draw
    this.options = draw.getOptions()
    this.imageCache = new Map()
  }

  protected addImageObserver(promise: Promise<unknown>) {
    this.draw.getImageObserver().add(promise)
  }

  public render(
    ctx: CanvasRenderingContext2D,
    element: IElement,
    x: number,
    y: number
  ) {
    const { scale } = this.options
    const width = element.width! * scale
    const height = element.height! * scale
    const chartContainer = document.createElement('div')
    chartContainer.style.width = `${width}px`
    chartContainer.style.height = `${height}px`
    chartContainer.innerText = 'chart render...'

    const imageLoadPromise = new Promise(() => {
      const chartIns = echarts.init(chartContainer)
      chartIns.setOption({
        animation: false,
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

      const cvs = chartIns.renderToCanvas()
      ctx.drawImage(cvs, x, y, width, height)
    })
    this.addImageObserver(imageLoadPromise)
  }
}