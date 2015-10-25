/** @jsx mathboxDOM */
'use strict';

var mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor'],
  controls: {
    klass: THREE.OrbitControls
  }
});
var three = mathbox.three;

three.camera.position.set(.3, 1, 3);
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

mathboxDOM(
  'root',
  { id: '1', scale: 720 },
  mathboxDOM(
    'rtt',
    { id: '2', history: 2, type: 'unsignedByte' },
    mathboxDOM('camera', { lookAt: [0, 0, 0], position: function (t) {
        var x = Math.cos(t) * 3,
            z = Math.sin(t) * 3;
        return [x, 0, z];
      } }),
    mathboxDOM('shader', { id: '4', code: '\nvec4 getSample(vec3 xyz);\nvec4 getFramesSample(vec3 xyz) {\n  vec4 c = getSample(xyz + vec3( 0.0, 0.0, 1.0));\n  vec3 t = getSample(xyz + vec3( 0.0, 1.0, 0.0)).xyz;\n  vec3 b = getSample(xyz + vec3( 0.0,-1.0, 0.0)).xyz;\n  vec3 l = getSample(xyz + vec3(-1.0, 0.0, 0.0)).xyz;\n  vec3 r = getSample(xyz + vec3( 1.0, 0.0, 0.0)).xyz;\n  return vec4((t + b + l + r) / 2.0 - c.xyz, c.w);\n}'
    }),
    mathboxDOM('resample', { id: '5', indices: 3, channels: 4 }),
    mathboxDOM('compose', { id: '6', color: '#ffffff', zWrite: false }),
    mathboxDOM(
      'cartesian',
      { id: '7', range: [[-2, 2], [-1, 1], [-1, 1]], scale: [2, 1, 1] },
      mathboxDOM('grid', { id: '8', divideX: 2, divideY: 2, zBias: 10, opacity: 1 / 4, color: 12640511, width: 3 }),
      mathboxDOM('end', null)
    ),
    mathboxDOM('end', null)
  ),
  mathboxDOM('compose', { id: '9', color: '#fff', zWrite: false })
);

var camera = mathbox.select('rtt camera');