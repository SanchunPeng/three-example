
const THREE = window.THREE;
// let mouseX = 0
// let mouseY = 0
// let mouseDown = false

export default function objcontrol (camera, domElement) {
  // console.log(_this.props.style)
  const controls = new THREE.OrbitControls(camera, domElement);
  // console.log(_this)
  // console.log(houseSize)
  // TODO
  // 是否自动旋转
  controls.autoRotate = false;
  // 最大最小鼠标缩放大小（正交相机）
  controls.minZoom = 1;
  controls.maxZoom = 5;
  // 滚轮是否可控制zoom，zoom速度默认1
  controls.enableZoom = true
  // 是否可平移，默认移动速度为7px
  controls.enablePan = true
  // 是否能使用键盘
  controls.enableKeys = false

  controls.inertiaMovingFactor = 0.75;

  controls.screenSpacePaning = true
  controls.enabled = true
  controls.limitInScreenPoint = new THREE.Vector3()

  controls.update();

  return controls
}
