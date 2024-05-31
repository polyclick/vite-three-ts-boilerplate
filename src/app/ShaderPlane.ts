import { GLSL3, Mesh, PlaneGeometry, ShaderMaterial } from 'three'

import DefaultVert from './shaders/DefaultVert.glsl'
import DefaultFrag from './shaders/DefaultFrag.glsl'


export default class ShaderPlane extends Mesh {

  constructor(width: number, height: number) {
    super()

    this.geometry = new PlaneGeometry(width, height, 1, 1)
    this.material = new ShaderMaterial({
      vertexShader: DefaultVert,
      fragmentShader: DefaultFrag,
      glslVersion: GLSL3
    })
  }

  updateSize(width: number, height: number) {
    this.geometry.dispose()
    this.geometry = new PlaneGeometry(width, height, 1, 1)
  }

}