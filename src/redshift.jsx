   /** @jsx mathboxDOM */
    var mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor'],
      controls: {
        klass: THREE.SpaceControls,
      },
      camera: {
      }
    });

    var size = 1;
    var three = mathbox.three;
    three.controls.movementForce = 0.001;
    three.controls.rollSpeed = Math.PI / 10;
    //three.controls.noZoom = true;
    three.camera.position.set(0.5, 0.5, 0.5);
    three.camera.rotation.set(2.4241266337500704,  -0.6035537498121939, 1.4264561696348526);
    three.renderer.setClearColor(new THREE.Color(0), 1.0);
    
    var stars = [];
    var starDistance = []
    for(var i = 0; i < 16000; i++){
      var star = [];
      var r = Math.sqrt(Math.random() * size/2);
      var phi = Math.random()*360;
      var theta = Math.random()*180;
      star.push(r * Math.sin(theta) * Math.cos(phi) + size/2);
      star.push(r * Math.sin(theta) * Math.sin(phi) + size/2);
      star.push(r * Math.cos(theta) + size/2);
      stars.push(star);
      starDistance.push(0);
    }
    
    function dist(p1, p2){
      var x = p1[0] - p2[0];
      var y = p1[1] - p2[1];
      var z = p1[2] - p2[2];
      
      return Math.sqrt(x*x + y*y + z*z);
    }
    
<root id="1" scale={720} focus={0.5}>
  <shader id="3" code={`
  uniform float time;
  uniform float intensity;
  uniform vec4 position;
  uniform float velocity;
  
  vec4 warpVertex(vec4 xyzw, inout vec4 stpq) {
    //xyzw +=   0.2 * intensity * (sin(xyzw.yzwx * 1.91 + time + sin(xyzw.wxyz * 1.74 + time)));
    //xyzw +=   0.1 * intensity * (sin(xyzw.yzwx * 4.03 + time + sin(xyzw.wxyz * 2.74 + time)));
    //xyzw +=  0.05 * intensity * (sin(xyzw.yzwx * 8.39 + time + sin(xyzw.wxyz * 4.18 + time)));
    //xyzw += 0.025 * intensity * (sin(xyzw.yzwx * 15.1 + time + sin(xyzw.wxyz * 9.18 + time)));
    
    xyzw.x -= velocity * (xyzw.x - position.x);
    xyzw.y -= velocity * (xyzw.y - position.y);
    xyzw.z -= velocity * (xyzw.z - position.z);
  
    return xyzw;
  }`}
 dynamictime={(t) => t / 4} dynamicintensity={(t) => {
        t = t / 4;
        var intensity = .5 + .5 * Math.cos(t / 3);
        intensity = 1.0 - Math.pow(intensity, 4);
        return intensity * 2.5;
      }}
      dynamicposition={(t) => {
        return new THREE.Vector4(three.camera.position.x*size, three.camera.position.y*size, three.camera.position.z*size, 0);
        //return new THREE.Vector4(size/2, size/2, size/2, 0);
      }} 
      dynamicvelocity={(t) => {
        return three.controls.totalMovementSpeed * 50;
      }}/>
  <vertex pass="view">
  <transform position={[0.5, 0.5, 0.5]} scale={[0.5, 0.5, 0.5]}>
    <cartesian id="2" range={[[0, size], [0, size], [0, size]]} scale={[1, 1, 1]}>
      <array id="starPositions" live={false} data={stars} length={stars.length} items={1} channels={3} />
      <array id="starColors" length={stars.length} items={1} channels={4} observe={true} expr={function(emit, i){
        //console.log(arguments);
        var starPos = stars[i];
        var cameraPosVector = three.camera.position;
        var cameraPos = [cameraPosVector.x*size, cameraPosVector.y*size, cameraPosVector.z*size];
        
        var distance = dist(starPos, cameraPos);
        var velocity = distance - starDistance[i];
        starDistance[i] = distance;
        
        var redshift = distance / 5 + velocity / 0.05;
        if(Math.random() < 0.01) console.log(redshift);
        //var hue = d3.max([d3.min([60-3*redshift, 300]), 0]);
        //var lightness = d3.max([d3.min([0.5 - velocity/300, 1]), 0.5]);
        //var color = d3.hsl(hue, 0.7, 0.8).rgb();
        //return emit(color.r/255,color.g/255,color.b/255,1);
        
        //var redshift = velocity / 0.0005;
        return emit(Math.min(1,Math.max(0,1+redshift)), Math.min(1,Math.max(0,1-0.75*redshift)), Math.min(1,Math.max(0,1-redshift)), 1);
      }} />
      <point id="4" points="#starPositions" colors="#starColors" color={0xffffff} size={0.5} />
      <array length={1} items={1} channels={3} expr={function(emit){
      
        var cameraPosVector = three.camera.position;
        emit(cameraPosVector.x*size, cameraPosVector.y*size, cameraPosVector.z*size);
      }} />
      <point size={1} color={0x0000ff} />
    </cartesian>
  </transform>
  </vertex>
</root>