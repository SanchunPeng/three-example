const THREE = window.THREE
export default function createRender(opt) {
    const render = new THREE.WebGLRenderer({
        // alpha: true,
        // autoUpdate: false,
        // sortObjects: true,
        antialias: true,
        autoClear: true
    })
    render.setClearColor( 0x050505 );
    render.setPixelRatio(window.devicePixelRatio)
    render.setSize(opt.fullWidth, opt.fullHeight)
    return render
}