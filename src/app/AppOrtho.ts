import { GUI } from 'lil-gui'
import { Clock, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import ShaderPlane from './ShaderPlane'

export class App {

  private config: any

  private containerEl: HTMLElement
  private objectEl: HTMLElement
  private canvasEl: HTMLCanvasElement

  private gui: GUI
  private stats: Stats

  private clock: Clock
  private scene: Scene
  private camera: OrthographicCamera
  private renderer: WebGLRenderer

  // private brick: Brick
  private shaderPlane: ShaderPlane


  ///////////////////////////////////////////////////////////////////////////////
  //// CONSTRUCTOR
  ///////////////////////////////////////////////////////////////////////////////

  constructor() {

    this.config = {
      // add gui parameters here
    }

    // Canvas element
    this.containerEl = document.body.querySelector(`#container`)!
    this.objectEl = this.containerEl.querySelector(`#object`)!
    this.canvasEl = this.objectEl.querySelector(`canvas`)!

    // Clock
    this.clock = new Clock()
    this.clock.start()

    // Scene
    this.scene = new Scene()

    // Camera
    this.camera = new OrthographicCamera(
      this.vpWidth / -2,
      this.vpWidth / 2,
      this.vpHeight / 2,
      this.vpHeight / -2,
      0.01,
      1000
    )
    this.camera.position.z = 1
    this.scene.add(this.camera)

    // Renderer
    this.renderer = new WebGLRenderer({ canvas: this.canvasEl, antialias: true })
    this.renderer.setClearColor(0x000000)

    // Lil Gui
    this.gui = new GUI()

    // Stats
    this.stats = new Stats()
    this.stats.showPanel(0)
    document.body.appendChild(this.stats.dom)

    // Shader plane
    this.shaderPlane = new ShaderPlane(this.vpWidth, this.vpHeight)
    this.scene.add(this.shaderPlane)

    // Container resize
    new ResizeObserver(() => this.onContainerResize()).observe(this.containerEl)

    // Start update loop
    this.update()
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// UPDATE LOOP
  ///////////////////////////////////////////////////////////////////////////////

  private update() {
    requestAnimationFrame(() => this.update())

    this.stats.begin()

    this.renderer.render(this.scene, this.camera)

    this.stats.end()
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// RESIZING
  ///////////////////////////////////////////////////////////////////////////////

  // The container div has resized
  //  ↪ Keep 'object' div within the container respecting its set aspect ratio (contain)
  //  ↪ Update the three.js renderer, camera aspect, ...
  private onContainerResize() {
    const { containerEl, objectEl, renderer, camera } = this

    if(!containerEl || !objectEl) return;

    // Set object style width/height to auto (simulates a css display 'contain')
    const isTall = containerEl.clientWidth / containerEl.clientHeight < this.vpAspectRatio
    objectEl.style.width = isTall ? '100%' : 'auto'
    objectEl.style.height = isTall ? 'auto' : '100%'

    // Update three.js stuff
    //  ↪ See: https://stackoverflow.com/a/45046955/341358
    const canvas = renderer.domElement

    // Get the canvas size
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    // Adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {

      // Update renderer
      renderer.setSize(width, height, false)

      // Update camera
      camera.left = this.vpWidth / -2
      camera.right = this.vpWidth / 2
      camera.top = this.vpHeight / 2
      camera.bottom = this.vpHeight / -2
      camera.updateProjectionMatrix()

      // NOTE: Update any render target sizes or other object that are resolution dependant
      // Update shader plane size
      this.shaderPlane.updateSize(width, height)
    }
  }



  ///////////////////////////////////////////////////////////////////////////////
  //// GETTERS
  ///////////////////////////////////////////////////////////////////////////////

  private get vpWidth() {
    return this.objectEl ? this.objectEl.clientWidth : 0
  }

  private get vpHeight() {
    return this.objectEl ? this.objectEl.clientHeight : 0
  }

  private get vpAspectRatio() {
    return this.vpHeight ? this.vpWidth / this.vpHeight : 0
  }
}
