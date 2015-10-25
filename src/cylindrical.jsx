/** @jsx mathboxDOM */
var mathbox = mathBox({
    plugins: ['core', 'controls', 'cursor'],
    controls: {
      klass: THREE.OrbitControls,
      parameters: {
        noZoom: true,
      },
    },
    loop: {
      start: window == window.top,
    },
  });
  var three = mathbox.three;

  three.camera.position.set(5.5, .5, -2.3);
  three.renderer.setClearColor(new THREE.Color(0x000000), 1.0);

  var objs = null
  var time = 0
  three.on('update', function () {
    var clock = three.Time.frames / 60
    time = clock

    var t = Math.max(clock, 0) / 2
    t = t < .5 ? t * t : t - .25

    var f = t / 8;
    var c = Math.cos(f);
    var s = Math.sin(f);
    mathbox.select('polar#view').set('quaternion', [0, -s, 0, c]);

    t = Math.max(clock - 4, 0) / 2
    t = t < .5 ? t * t : t - .25

    f = t / 3.71;
    c = Math.cos(f);
    s = Math.sin(f);

    if (objs)
      objs.set('quaternion', [-s, 0, 0, c]);
  });

  var view = (<root>
  <unit scale={600} focus={4}>
    <polar id="view" range={[[-π, π], [0, 1], [-1, 1]]} scale={[2, 2, 2]} quaternion={[0, 0, 0, 1]}>
      <transform position={[0, 1/2, 0]}>
        <grid unitX={π/6} baseX={2} zWrite={false} detailX={81} divideX={6} divideY={10} axes="xz" blending="add" color={61616} opacity={1/5} />
      </transform>
      <transform position={[0, 1/2, 0]}>
        <grid unitX={π/3} baseX={2} zWrite={false} detailX={81} divideX={3} divideY={3} axes="xz" blending="add" color={61616} opacity={1/5} />
      </transform>
      <transform position={[0, 1, 0]}>
        <grid unitX={π/3} baseX={2} zWrite={false} detailX={81} divideX={3} divideY={3} axes="xz" blending="add" color={61616} opacity={9/25} />
      </transform>
      <interval centered={true} axis="z" length={512} history={64} fps={60} expr={function expr(emit, x, i, t) {
    var j = Math.floor(i / 2),
        theta = t / 2 * (1 + Math.sin(j * j * j + j) * .5) * 4,
        rad = Math.sin(j * 12 + j * j) * .5 + Math.sin((j * .018 + 1 + Math.sin(j) * .3) * (t + 5) / 2);
    emit(theta, rad * .5, x / π);
  }} channels={3} />
      <split axis="width" length={2} />
      <spread id="split" unit="absolute" width={[0, 0, 1/50, 0]} depth={[0, 0, 1/100, 0]} />
      <transpose id="strips" order="xzyw" />
      <transform classes={["surface"]} position={[0, 3/4, 0]} scale={[1, 1, π]} quaternion={[0, 0, 0, 1]}>
        <surface width={3/2} zBias={2} color={3174655} points="<" fill={false} lineY={true} />
      </transform>
      <transform classes={["surface"]} position={[0, 3/4, 0]} scale={[1, 1, π]} quaternion={[0, 0, 0, 1]}>
        <shader code="
uniform vec4 dataResolution;
vec4 getPosition(vec4 xyzw);
vec4 getColor(vec4 xyzw) {
  return vec4(mix(vec3(1.0), vec3(1.0, 2.0, 1.5), mod(xyzw.z, 3.0) / 2.0) * (1.0 - vec3(xyzw.y * dataResolution.y)), 1.0);
}"
 />
        <resample />
        <surface width={2} color={3182847} points="<<" colors="<" shaded={true} />
      </transform>
    </polar>
  </unit>
</root>);

  objs = mathbox.select('transform.surface');