/** @jsx mathboxDOM */
    var mathbox = mathBox({
      plugins: ['core', 'controls', 'cursor'],
      controls: {
        klass: THREE.OrbitControls
      },
    });
    var three = mathbox.three;

    three.camera.position.set(2.3, 1, 2);
    three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

    var time = 0,
    angle = 0,
    deform = 0,
    skew = 0,
    fa = 6,
    fb = 4;

    three.on('update', function () {
      time = three.Time.clock * .6
      angle = wobbler(time / 5) * .6 + π/4 + .2;
      skew = wobbler(time / 16.1) * .25;
      deform = wobbler(time / 7.1)

      if (deform == 0) {
        fa = (Math.ceil(Math.random() * 2) + 1) * 2
        fb = (Math.ceil(Math.random() * 2) + 1) * 2
      }

      deform *= cosineEase(time - 2)
    });

    var clamp = function (x, a, b) {
      return Math.max(a, Math.min(b, x));
    };

    var cosineEase = function (t) {
      return .5 - .5 * Math.cos(clamp(t, 0, 1) * π);
    };

    var wobbler = function (t) {
      t = Math.sin(Math.min(1, Math.max(-1, .7*Math.asin(Math.cos(π*t))))*τ/4);
      return t*.5-.5;
    };

    var hopf = function (emit, ϕ, θ, γ) {
      var η  = θ / 2 + (Math.cos(ϕ * 2 + time) * skew + Math.cos(ϕ * fa)) * .15 * deform,
      ξ1 = ϕ + Math.cos(γ * fb + time)*.25 * deform,
      ξ2 = γ,

      sum  = ξ1 + ξ2,
      diff = ξ1 - ξ2,

      s = Math.sin(η),
      c = Math.cos(η),

      x = Math.cos(sum)  * s,
      y = Math.sin(sum)  * s,
      z = Math.cos(diff) * c,
      w = Math.sin(diff) * c

      emit(z, y, w, x);
    };

    var view = (<root id="1">
  <unit id="2" scale={500}>
    <stereographic4 id="3" range={[[-4, 4], [-4, 4], [-4, 4], [-1, 1]]} scale={[4, 4, 4, 1]}>
      <area id="4" rangeX={[-π, π]} rangeY={[-π/2, π/2]} width={127} height={16} centeredX={false} centeredY={true} expr={function expr(emit, x, y, i, j) {
    var ϕ = y;
    var θ = angle;
    hopf(emit, ϕ, θ, x);
  }} channels={4} />
      <line id="5" color={3178751} zBias={10} width={3} />
      <area id="6" rangeX={[-π, π]} rangeY={[-3/5, 3/5]} width={127} height={63} expr={function expr(emit, x, y, i, j) {
    var ϕ = y + time;
    var θ = angle;
    hopf(emit, ϕ, θ, x);
  }} channels={4} />
      <surface id="7" shaded={true} color={3178751} zBias={-5} />
      <area id="8" rangeX={[-π, π]} rangeY={[-π/2, π/2]} width={127} height={63} expr={function expr(emit, x, y, i, j) {
    var ϕ = y;
    var θ = angle;
    hopf(emit, ϕ, θ, x);
  }} channels={4} />
      <surface id="9" shaded={true} color={16777215} opacity={1/2} zBias={-10} />
    </stereographic4>
  </unit>
</root>);