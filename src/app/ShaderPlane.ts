import { Mesh, PlaneGeometry, ShaderMaterial } from 'three'

import DefaultVertexShaderGLSL from './shaders/DefaultVertexShader.glsl'
import DefaultFragmentShaderGLSL from './shaders/DefaultFragmentShader.glsl'

export default class ShaderPlane extends Mesh {
  constructor() {
    super()
    this.geometry = new PlaneGeometry(100, 100, 1, 1)
    this.material = new ShaderMaterial({
      vertexShader: DefaultVertexShaderGLSL,
      fragmentShader: DefaultFragmentShaderGLSL,
    })
  }
}
