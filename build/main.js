/** @jsx mathboxDOM */

'use strict';

var mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor', 'mathbox'],
  controls: {
    // Orbit controls, i.e. Euler angles, with gimbal lock
    klass: THREE.OrbitControls

  }
});
// Trackball controls, i.e. Free quaternion rotation
//klass: THREE.TrackballControls,
if (mathbox.fallback) throw "WebGL not supported";

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

mathboxDOM(
  'root',
  { focus: 3 },
  mathboxDOM('camera', { proxy: true, position: [0, 0, 3] }),
  mathboxDOM(
    'cartesian',
    { id: 'hello', range: [[-2, 2], [-1, 1]], scale: [2, 1] },
    mathboxDOM('axis', { axis: 1, width: 3, color: 'black' }),
    mathboxDOM('axis', { axis: 2, width: 3, color: 'black' }),
    mathboxDOM('grid', { width: 2, divideX: 20, divideY: 10 }),
    mathboxDOM('interval', { expr: function expr(emit, x, i, t) {
        emit(x, Math.sin(x + t));
      }, length: 64, channels: 2 }),
    mathboxDOM('line', { width: 5, color: '#3090FF' }),
    mathboxDOM('point', { size: 8, color: '#3090FF' }),
    mathboxDOM('interval', { expr: function (emit, x, i, t) {
        emit(x, 0);
        emit(x, -Math.sin(x + t));
      }, length: 64, channels: 2, items: 2 }),
    mathboxDOM('vector', { end: true, width: 5, color: '#50A000' }),
    mathboxDOM('scale', { divide: 10 }),
    mathboxDOM('ticks', { width: 5, size: 15, color: 'black' }),
    mathboxDOM('format', { digits: 2, weight: 'bold' }),
    mathboxDOM('label', { color: 'red', zIndex: 1 })
  ),
  mathboxDOM('play', { target: 'cartesian', pace: 5, to: 2, loop: true, script: [{ props: { range: [[-2, 2], [-1, 1]] } }, { props: { range: [[-4, 4], [-2, 2]] } }, { props: { range: [[-2, 2], [-1, 1]] } }] })
);