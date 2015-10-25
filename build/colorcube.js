/** @jsx mathboxDOM */
'use strict';

var mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor'],
  controls: {
    klass: THREE.OrbitControls
  },
  camera: {}
});

var three = mathbox.three;
three.controls.maxDistance = 4;
three.camera.position.set(2.5, 1, 2.5);
three.renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

var view = mathboxDOM(
  'root',
  { id: '1', scale: 720, focus: 1 },
  mathboxDOM(
    'cartesian',
    { id: '2', range: [[0, 1], [0, 1], [0, 1]], scale: [1, 1, 1] },
    mathboxDOM('volume', { id: 'volume', width: 10, height: 10, depth: 10, items: 1, channels: 4, expr: function expr(emit, x, y, z) {
        emit(x, y, z, 1);
      } }),
    mathboxDOM('point', { id: '4', points: '#volume', colors: '#volume', color: 16777215, size: 20 })
  )
);