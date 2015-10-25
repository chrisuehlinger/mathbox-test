/** @jsx mathboxDOM */
var mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor'],
      controls: {
        klass: THREE.OrbitControls
      },
    });
    var three = mathbox.three;

    three.camera.position.set(.3, 1, 3);
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

<root id="1" scale={720}>
  <rtt id="2" history={2} type="unsignedByte">
    <camera lookAt={[0, 0, 0]} position={function(t) {
    var x = Math.cos(t) * 3,
        z = Math.sin(t) * 3;
    return [x, 0, z];
  }}/>
    <shader id="4" code={`
vec4 getSample(vec3 xyz);
vec4 getFramesSample(vec3 xyz) {
  vec4 c = getSample(xyz + vec3( 0.0, 0.0, 1.0));
  vec3 t = getSample(xyz + vec3( 0.0, 1.0, 0.0)).xyz;
  vec3 b = getSample(xyz + vec3( 0.0,-1.0, 0.0)).xyz;
  vec3 l = getSample(xyz + vec3(-1.0, 0.0, 0.0)).xyz;
  vec3 r = getSample(xyz + vec3( 1.0, 0.0, 0.0)).xyz;
  return vec4((t + b + l + r) / 2.0 - c.xyz, c.w);
}`}
 />
    <resample id="5" indices={3} channels={4} />
    <compose id="6" color="#ffffff" zWrite={false} />
    <cartesian id="7" range={[[-2, 2], [-1, 1], [-1, 1]]} scale={[2, 1, 1]}>
      <grid id="8" divideX={2} divideY={2} zBias={10} opacity={1/4} color={12640511} width={3} />
      <end />
    </cartesian>
    <end />
  </rtt>
  <compose id="9" color="#fff" zWrite={false} />
</root>

    var camera = mathbox.select('rtt camera');