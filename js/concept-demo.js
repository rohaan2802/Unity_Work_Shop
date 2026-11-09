/*
 * Browser concept illustration of Courtyard Walk.
 * This is not a Unity player and not a WebGL build.
 * Ground-plane numbers match Assets/Scripts/Courtyard/CourtyardLayout.cs.
 * Gravity and the follow camera exist only in the Unity scripts.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  root.CourtyardConcept = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var LAYOUT = {
    arenaHalf: 12,
    wallThickness: 0.5,
    playerRadius: 0.5,
    moveSpeed: 5,
    orbRadius: 0.45,
    columnRadius: 0.6,
    spawn: { x: 0, z: -8 },
    pad: { x: 8, z: -8, hx: 1.2, hz: 1.2 },
    column: { x: 3, z: -4 },
    orbs: [
      { x: -8, z: -6 },
      { x: 8, z: -4 },
      { x: 7, z: 7 },
      { x: -9, z: 1 },
      { x: 1.5, z: 0.5 }
    ],
    blocks: [
      { x: 4, z: 2, hx: 1, hz: 1 },
      { x: -5, z: 5, hx: 1.5, hz: 0.8 },
      { x: -1, z: 8, hx: 1, hz: 1 },
      { x: -3.2, z: -2, hx: 1.1, hz: 1.1 }
    ]
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function createSim() {
    var state = blank();

    function blank() {
      return {
        x: LAYOUT.spawn.x,
        z: LAYOUT.spawn.z,
        orbs: LAYOUT.orbs.map(function () { return true; }),
        collected: 0,
        cleared: false,
        status: "Walk the courtyard and touch every orb.",
        onPad: false
      };
    }

    function restart() {
      state = blank();
      state.status = "Restarted. The orbs are back.";
    }

    function fresh() {
      state = blank();
    }

    function resolve(x, z) {
      var inner = LAYOUT.arenaHalf - LAYOUT.wallThickness / 2 - LAYOUT.playerRadius;
      x = clamp(x, -inner, inner);
      z = clamp(z, -inner, inner);
      var i;
      for (i = 0; i < LAYOUT.blocks.length; i++) {
        var block = LAYOUT.blocks[i];
        var pushed = pushCircleFromAabb(x, z, LAYOUT.playerRadius, block);
        x = pushed.x;
        z = pushed.z;
      }
      var dx = x - LAYOUT.column.x;
      var dz = z - LAYOUT.column.z;
      var minDist = LAYOUT.playerRadius + LAYOUT.columnRadius;
      var dist = Math.hypot(dx, dz);
      if (dist < minDist) {
        if (dist < 0.0001) {
          x += minDist;
        } else {
          var scale = minDist / dist;
          x = LAYOUT.column.x + dx * scale;
          z = LAYOUT.column.z + dz * scale;
        }
      }
      x = clamp(x, -inner, inner);
      z = clamp(z, -inner, inner);
      return { x: x, z: z };
    }

    function step(dt, input) {
      var ix = input && input.x ? input.x : 0;
      var iz = input && input.z ? input.z : 0;
      var mag = Math.hypot(ix, iz);
      if (mag > 1) {
        ix /= mag;
        iz /= mag;
      }
      var next = resolve(
        state.x + ix * LAYOUT.moveSpeed * dt,
        state.z + iz * LAYOUT.moveSpeed * dt
      );
      state.x = next.x;
      state.z = next.z;
      var o;
      for (o = 0; o < LAYOUT.orbs.length; o++) {
        if (!state.orbs[o]) continue;
        var orb = LAYOUT.orbs[o];
        if (Math.hypot(state.x - orb.x, state.z - orb.z) <= LAYOUT.playerRadius + LAYOUT.orbRadius) {
          state.orbs[o] = false;
          state.collected += 1;
          if (state.collected >= LAYOUT.orbs.length) {
            state.cleared = true;
            state.status = "Courtyard clear. Press R to walk it again.";
          } else {
            state.status = "Orb collected.";
          }
        }
      }
      var onPad = Math.abs(state.x - LAYOUT.pad.x) <= LAYOUT.pad.hx && Math.abs(state.z - LAYOUT.pad.z) <= LAYOUT.pad.hz;
      if (onPad && !state.onPad) {
        state.x = LAYOUT.spawn.x;
        state.z = LAYOUT.spawn.z;
        state.status = state.cleared
          ? "Courtyard clear. The pad only returns you to the start."
          : "Reset pad. Orbs you already took stay taken.";
      }
      state.onPad = onPad && state.x === LAYOUT.spawn.x ? false : onPad;
      if (state.x === LAYOUT.spawn.x && state.z === LAYOUT.spawn.z) {
        state.onPad = false;
      }
    }

    function drive(tx, tz) {
      var stuck = 0;
      var n;
      for (n = 0; n < 120; n++) {
        var dx = tx - state.x;
        var dz = tz - state.z;
        var dist = Math.hypot(dx, dz);
        if (dist < 0.35) return true;
        var ix = dx / dist;
        var iz = dz / dist;
        if (stuck > 3) {
          var swap = ix;
          ix = -iz;
          iz = swap;
        }
        var beforeX = state.x;
        var beforeZ = state.z;
        step(0.1, { x: ix, z: iz });
        if (Math.hypot(state.x - beforeX, state.z - beforeZ) < 0.02) stuck += 1;
        else stuck = 0;
      }
      return false;
    }

    function steerTo(tx, tz) {
      if (drive(tx, tz)) return true;
      var mx = (state.x + tx) / 2;
      var mz = (state.z + tz) / 2;
      var dx = tx - state.x;
      var dz = tz - state.z;
      var len = Math.hypot(dx, dz) || 1;
      drive(mx + (-dz / len) * 4, mz + (dx / len) * 4);
      return drive(tx, tz);
    }

    function seek(mode) {
      fresh();
      if (mode === "restarted") {
        steerTo(LAYOUT.orbs[0].x, LAYOUT.orbs[0].z);
        restart();
        return snapshot();
      }
      if (mode === "moved") {
        var i;
        for (i = 0; i < 24; i++) step(0.1, { x: 1, z: 0.15 });
        state.status = "Walking. No orb touched yet.";
        return snapshot();
      }
      if (mode === "collected" || mode === "pad" || mode === "clear") {
        var count = mode === "clear" ? LAYOUT.orbs.length : 2;
        var c;
        for (c = 0; c < count; c++) steerTo(LAYOUT.orbs[c].x, LAYOUT.orbs[c].z);
      }
      if (mode === "pad") {
        steerTo(LAYOUT.pad.x, LAYOUT.pad.z);
      }
      return snapshot();
    }

    function snapshot() {
      return {
        x: state.x,
        z: state.z,
        orbs: state.orbs.slice(),
        collected: state.collected,
        cleared: state.cleared,
        status: state.status
      };
    }

    return {
      step: step,
      restart: restart,
      fresh: fresh,
      seek: seek,
      snapshot: snapshot,
      get state() { return state; }
    };
  }

  function pushCircleFromAabb(x, z, radius, box) {
    var closestX = clamp(x, box.x - box.hx, box.x + box.hx);
    var closestZ = clamp(z, box.z - box.hz, box.z + box.hz);
    var dx = x - closestX;
    var dz = z - closestZ;
    var d2 = dx * dx + dz * dz;
    if (d2 >= radius * radius) return { x: x, z: z };
    if (d2 === 0) {
      var left = Math.abs(x - (box.x - box.hx));
      var right = Math.abs((box.x + box.hx) - x);
      var down = Math.abs(z - (box.z - box.hz));
      var up = Math.abs((box.z + box.hz) - z);
      var min = Math.min(left, right, down, up);
      if (min === left) x = box.x - box.hx - radius;
      else if (min === right) x = box.x + box.hx + radius;
      else if (min === down) z = box.z - box.hz - radius;
      else z = box.z + box.hz + radius;
      return { x: x, z: z };
    }
    var dist = Math.sqrt(d2);
    var push = radius - dist;
    return { x: x + (dx / dist) * push, z: z + (dz / dist) * push };
  }

  function mount(canvas, statusEl, options) {
    options = options || {};
    var sim = createSim();
    if (options.mode && options.mode !== "start") sim.seek(options.mode);
    else sim.fresh();
    var input = { x: 0, z: 0 };
    var keys = {};
    var reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (err) { reduce = false; }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      draw();
    }

    function worldToCanvas(x, z, ctx) {
      var pad = 28;
      var size = Math.min(canvas.width, canvas.height) - pad * 2;
      var scale = size / (LAYOUT.arenaHalf * 2 + 2);
      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      return { x: cx + x * scale, y: cy - z * scale, scale: scale };
    }

    function draw() {
      var ctx = canvas.getContext("2d");
      var snap = sim.snapshot();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#cbb892";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      var origin = worldToCanvas(0, 0, ctx);
      var edge = worldToCanvas(LAYOUT.arenaHalf, 0, ctx);
      var halfPx = Math.abs(edge.x - origin.x);
      ctx.fillStyle = "#e6d3ad";
      ctx.fillRect(origin.x - halfPx, origin.y - halfPx, halfPx * 2, halfPx * 2);
      ctx.strokeStyle = "#5c4e40";
      ctx.lineWidth = Math.max(6, halfPx * (LAYOUT.wallThickness / LAYOUT.arenaHalf));
      ctx.strokeRect(origin.x - halfPx, origin.y - halfPx, halfPx * 2, halfPx * 2);
      var b;
      for (b = 0; b < LAYOUT.blocks.length; b++) {
        var block = LAYOUT.blocks[b];
        var bp = worldToCanvas(block.x, block.z, ctx);
        ctx.fillStyle = "#8c7762";
        ctx.fillRect(bp.x - block.hx * bp.scale, bp.y - block.hz * bp.scale, block.hx * 2 * bp.scale, block.hz * 2 * bp.scale);
      }
      var col = worldToCanvas(LAYOUT.column.x, LAYOUT.column.z, ctx);
      ctx.fillStyle = "#a08b74";
      ctx.beginPath();
      ctx.arc(col.x, col.y, LAYOUT.columnRadius * col.scale, 0, Math.PI * 2);
      ctx.fill();
      var pad = worldToCanvas(LAYOUT.pad.x, LAYOUT.pad.z, ctx);
      ctx.fillStyle = "#b8382e";
      ctx.fillRect(pad.x - LAYOUT.pad.hx * pad.scale, pad.y - LAYOUT.pad.hz * pad.scale, LAYOUT.pad.hx * 2 * pad.scale, LAYOUT.pad.hz * 2 * pad.scale);
      var o;
      for (o = 0; o < LAYOUT.orbs.length; o++) {
        if (!snap.orbs[o]) continue;
        var op = worldToCanvas(LAYOUT.orbs[o].x, LAYOUT.orbs[o].z, ctx);
        ctx.fillStyle = "#e8c14a";
        ctx.beginPath();
        ctx.arc(op.x, op.y, LAYOUT.orbRadius * op.scale, 0, Math.PI * 2);
        ctx.fill();
      }
      var player = worldToCanvas(snap.x, snap.z, ctx);
      ctx.fillStyle = "#1a6b6e";
      ctx.beginPath();
      ctx.arc(player.x, player.y, LAYOUT.playerRadius * player.scale, 0, Math.PI * 2);
      ctx.fill();
      if (statusEl) {
        statusEl.textContent = "Orbs " + snap.collected + " / " + LAYOUT.orbs.length + ". " + snap.status;
      }
    }

    function held() {
      var x = (keys.ArrowRight || keys.d || keys.D ? 1 : 0) - (keys.ArrowLeft || keys.a || keys.A ? 1 : 0);
      var z = (keys.ArrowUp || keys.w || keys.W ? 1 : 0) - (keys.ArrowDown || keys.s || keys.S ? 1 : 0);
      return { x: x + input.x, z: z + input.z };
    }

    var last = 0;
    function frame(now) {
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      var h = held();
      if (h.x || h.z) sim.step(dt, h);
      draw();
      if (!reduce) requestAnimationFrame(frame);
      else if (h.x || h.z) requestAnimationFrame(frame);
    }

    function onKey(event, down) {
      var tag = event.target && event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (event.target && event.target.isContentEditable)) return;
      if (event.key === "r" || event.key === "R") {
        if (down) {
          sim.restart();
          draw();
        }
        return;
      }
      var watched = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D"];
      if (watched.indexOf(event.key) === -1) return;
      keys[event.key] = down;
      event.preventDefault();
    }

    window.addEventListener("keydown", function (event) { onKey(event, true); });
    window.addEventListener("keyup", function (event) { onKey(event, false); });
    window.addEventListener("resize", resize);
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(resize).observe(canvas);
    }
    resize();
    requestAnimationFrame(frame);

    return {
      sim: sim,
      draw: draw,
      setStick: function (x, z) { input.x = x; input.z = z; draw(); },
      seek: function (mode) { var snap = sim.seek(mode); draw(); return snap; },
      restart: function () { sim.restart(); draw(); }
    };
  }

  return { LAYOUT: LAYOUT, createSim: createSim, mount: mount };
});
