import React, {Component} from 'react'
import createRender from '../utils/createRender'
import objcontrol from '../controls/objcontrol';
const THREE = window.THREE


export default class DisplayCar extends Component{
    scene
    container
    camera
    renderer
    controls
    constructor(props) {
       super(props);
       this.state = {

       }
    }

    componentWillReceiveProps(nextProps) {
        this.nextProps = nextProps

        if (nextProps.fullWidth !== this.props.fullWidth) {
            this.initScene()
        }
        if (nextProps.currentColor !== this.props.currentColor && nextProps.currentColor !== '') {
            this.changeCarMaterial(nextProps.currentColor)
        }
    }

    changeCarMaterial = (color) => {
        this.scene.children.forEach(item => {
            if (item.name === 'car') {
                item.children[0].material.color = new THREE.Color(color)
            }
        })
    }


    createCarObj = () => {
        const _this = this

        const loader = new THREE.OBJLoader2(null, {enabled: false, debug: false})
        const objLoadedBack = function (obj) {
            // console.log(obj.detail.loaderRootNode.children[0])
            const object = obj.detail.loaderRootNode
            object.name = 'car'
            _this.scene.add( object );
        }
        const mtlLoadedBack = function (materials) {
            // loader.setModelName('car');
            loader.setMaterials( materials );
            // loader.setLogging( true, true );
            // 开始加载 obj
            loader.load( require('../objs/car1/file.obj'), objLoadedBack, null, null, null, false );
        }
        loader.loadMtl( require('../objs/car1/file.mtl'), null, mtlLoadedBack );
    }

    // createCarObj2 = () => {
    //     const _this = this

    //     const loader = new THREE.OBJLoader2(null, {enabled: false, debug: false})
    //     const objLoadedBack = function (obj) {
    //         console.log(obj.detail.loaderRootNode.children[0].material.color)
    //         obj.detail.loaderRootNode.children[0].material.color =  new THREE.Color( 0xff0000 )
    //         _this.scene.add( obj.detail.loaderRootNode );
    //     }
    //     loader.setModelName('car');
    //     loader.load( require('../objs/car1/file.obj'), objLoadedBack, null, null, null, false );

    // }

    initScene = () => {
        const _this = this
        const {fullWidth, fullHeight} = this.nextProps
        const container = this.container = document.getElementById('car-show')
        const renderer = this.renderer = createRender({fullWidth, fullHeight})
        const scene = this.scene = new THREE.Scene()
        const camera = this.camera = this.createCamera(fullWidth, fullHeight)
        this.scene.add(camera)
        container.appendChild(this.renderer.domElement)

        // 添加环境光与平行光
        const ambientLight = new THREE.AmbientLight( 0x404040 );
        const directionalLight1 = new THREE.DirectionalLight( 0xC0C090 );
        const directionalLight2 = new THREE.DirectionalLight( 0xC0C090 );

        directionalLight1.position.set( -100, -50, 100 );
        directionalLight2.position.set( 100, 50, -100 );

        this.scene.add( directionalLight1 );
        this.scene.add( directionalLight2 );
        this.scene.add( ambientLight );
        // 添加调试网格
        // const helper = new THREE.GridHelper( 1200, 60, 0xFF4444, 0x404040 );
        // this.scene.add( helper );

        animation()
        function animation () {
            requestAnimationFrame(animation)
            renderer.render(scene, camera)
            _this.controls.update();
        }

        this.createCarObj()

    }

    createCamera = (width, height) => {
        const camera = new THREE.PerspectiveCamera( 50, 1, 0.5, 100000 )
        camera.name = 'camera'
        camera.width = width
        camera.height = height
        camera.aspect = width/height
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        camera.position.set(0.0, 175.0, 500.0)
        camera.updateProjectionMatrix();
        this.controls = objcontrol(camera, this.renderer.domElement)
        return camera
    }

    componentDidMount() {
        window.displaycars = this

    }

    render() {
        return <div id="car-show">
        </div>
    }

}