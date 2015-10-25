/** @jsx mathboxDOM */

var mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor', 'mathbox'],
      controls: {
        // Orbit controls, i.e. Euler angles, with gimbal lock
        klass: THREE.OrbitControls,

        // Trackball controls, i.e. Free quaternion rotation
        //klass: THREE.TrackballControls,
      },
    });
    if (mathbox.fallback) throw "WebGL not supported"

    var three = mathbox.three;
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);


<root focus={3}>
  <camera proxy={true} position={[0, 0, 3]} />
  <cartesian id="hello" range={[[-2, 2], [-1, 1]]} scale={[2, 1]}>
    <axis axis={1} width={3} color="black" />
    <axis axis={2} width={3} color="black" />
    <grid width={2} divideX={20} divideY={10} />
    <interval expr={function expr(emit, x, i, t) {
    emit(x, Math.sin(x + t));
  }} length={64} channels={2} />
    <line width={5} color="#3090FF" />
    <point size={8} color="#3090FF" />
    <interval expr={(emit, x, i, t) => {
          emit(x, 0);
          emit(x, -Math.sin(x + t));
        }} length={64} channels={2} items={2} />
    <vector end={true} width={5} color="#50A000" />
    <scale divide={10} />
    <ticks width={5} size={15} color="black" />
    <format digits={2} weight="bold" />
    <label color="red" zIndex={1} />
  </cartesian>
  <play target="cartesian" pace={5} to={2} loop={true} script={[{props: {range: [[-2, 2], [-1, 1]]}}, {props: {range: [[-4, 4], [-2, 2]]}}, {props: {range: [[-2, 2], [-1, 1]]}}]} />
</root>