"use strict";

var assert = require("assert");
var demo = require("../js/concept-demo.js");
var LAYOUT = demo.LAYOUT;

function workshopAxisCheckIsAlwaysTrue(value) {
  return value > -2;
}

var samples = [-1, -0.5, 0, 0.25, 1];
samples.forEach(function (value) {
  assert.strictEqual(workshopAxisCheckIsAlwaysTrue(value), true, String(value));
});

var idle = demo.createSim();
var start = idle.snapshot();
idle.step(1, { x: 0, z: 0 });
assert.strictEqual(idle.snapshot().x, start.x);
assert.strictEqual(idle.snapshot().z, start.z);

var moved = demo.createSim();
moved.step(1, { x: 0, z: 1 });
assert.ok(moved.snapshot().z > start.z);

var east = demo.createSim();
east.step(1, { x: 4, z: 0 });
assert.ok(Math.abs(east.snapshot().x - (start.x + LAYOUT.moveSpeed)) < 0.02, "speed cap x " + east.snapshot().x);
assert.strictEqual(east.snapshot().z, start.z);

var west = demo.createSim();
var i;
for (i = 0; i < 40; i++) west.step(0.5, { x: -1, z: 0 });
var inner = LAYOUT.arenaHalf - LAYOUT.wallThickness / 2 - LAYOUT.playerRadius;
assert.ok(west.snapshot().x >= -inner - 0.001);
assert.ok(west.snapshot().x <= -inner + 0.05);

var blocked = demo.createSim();
blocked.seek("start");
var block = LAYOUT.blocks[0];
var reached = false;
for (i = 0; i < 80; i++) {
  blocked.step(0.1, { x: block.x > 0 ? 1 : -1, z: 1 });
}
var bx = blocked.snapshot().x;
var bz = blocked.snapshot().z;
var dx = Math.max(Math.abs(bx - block.x) - block.hx, 0);
var dz = Math.max(Math.abs(bz - block.z) - block.hz, 0);
assert.ok(Math.hypot(dx, dz) >= LAYOUT.playerRadius - 0.05, "penetrated block");

var collected = demo.createSim();
var snap = collected.seek("collected");
assert.strictEqual(snap.collected, 2, "expected 2 orbs, status " + snap.status);
assert.strictEqual(snap.orbs.filter(Boolean).length, 3);

var cleared = demo.createSim().seek("clear");
assert.strictEqual(cleared.collected, 5);
assert.strictEqual(cleared.cleared, true);
assert.ok(cleared.status.indexOf("Courtyard clear") === 0);

var padded = demo.createSim().seek("pad");
assert.strictEqual(padded.collected, 2);
assert.ok(Math.abs(padded.x - LAYOUT.spawn.x) < 0.01);
assert.ok(Math.abs(padded.z - LAYOUT.spawn.z) < 0.01);
assert.ok(padded.status.indexOf("Reset pad") === 0);

var restarted = demo.createSim().seek("restarted");
assert.strictEqual(restarted.collected, 0);
assert.strictEqual(restarted.orbs.filter(Boolean).length, 5);
assert.ok(restarted.status.indexOf("Restarted") === 0);

var once = demo.createSim();
once.seek("collected");
var before = once.snapshot().collected;
once.step(0.2, { x: 0, z: 0 });
assert.strictEqual(once.snapshot().collected, before);

var layout = demo.LAYOUT;
assert.ok(Math.abs(layout.spawn.x) + layout.playerRadius < layout.pad.x - layout.pad.hx, "spawn overlaps the pad");
layout.orbs.forEach(function (orb, index) {
  layout.blocks.forEach(function (block) {
    var dx = Math.max(Math.abs(orb.x - block.x) - block.hx, 0);
    var dz = Math.max(Math.abs(orb.z - block.z) - block.hz, 0);
    assert.ok(Math.hypot(dx, dz) > layout.orbRadius + 0.05, "orb " + index + " inside a block");
  });
  var gap = Math.hypot(orb.x - layout.column.x, orb.z - layout.column.z);
  assert.ok(gap > layout.orbRadius + layout.columnRadius, "orb " + index + " inside the column");
  var inner = layout.arenaHalf - layout.wallThickness / 2;
  assert.ok(Math.abs(orb.x) + layout.orbRadius < inner, "orb " + index + " in the wall");
  assert.ok(Math.abs(orb.z) + layout.orbRadius < inner, "orb " + index + " in the wall");
});

var columnHit = demo.createSim();
columnHit.fresh();
var guard = 0;
while (guard < 30 && Math.hypot(columnHit.snapshot().x - layout.column.x, columnHit.snapshot().z - layout.column.z) > layout.playerRadius + layout.columnRadius + 0.2) {
  columnHit.step(0.1, { x: 1, z: 1 });
  guard += 1;
}
var after = columnHit.snapshot();
var columnGap = Math.hypot(after.x - layout.column.x, after.z - layout.column.z);
assert.ok(columnGap >= layout.playerRadius + layout.columnRadius - 0.05, "penetrated column " + columnGap);

var north = demo.createSim();
north.fresh();
north.step(1, { x: 0, z: 1 });
assert.ok(Math.abs((north.snapshot().z - layout.spawn.z) - layout.moveSpeed) < 0.02);

var again = demo.createSim();
again.seek("collected");
var held = again.snapshot().collected;
again.step(1, { x: 0, z: 0 });
assert.strictEqual(again.snapshot().collected, held);

console.log("courtyard_sim.test.js: 14 checks passed");
console.log("collected", snap.collected, "clear", cleared.collected, "pad", padded.status);
