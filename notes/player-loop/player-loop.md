# Player loop

`Unity Learning.txt` in this folder is the workshop note, unchanged. The sentences below are that note. The correction follows each one.

## Update

Workshop note: "update --> call on each frame..... (like infinite loop)".

`Update` does run once per rendered frame. It is not a `while` loop written in the script. `Walker.Update` is where Courtyard Walk reads the keys and calls `CharacterController.Move`.

## LateUpdate

Workshop note: "late update -> skip the particular time only once ( e.g time is 10s set...call after 10s and call continously)".

That description does not match LateUpdate. `LateUpdate` runs every frame, after every `Update` on that frame. It does not wait for a timer and it does not run only once. `FollowCamera` uses it so the camera reads the walker's position after movement in the same frame.

A one-shot delay is `Invoke` or a coroutine, which the workshop note does not name.

## FixedUpdate

Workshop note: "fixed update-->skip the fixed time each time call(e.g time is 10s set...call after 10s and then after 10s execute and then call after 10s)".

`FixedUpdate` follows the fixed timestep. In `ProjectSettings/TimeManager.asset` that value is 0.02 seconds, which is 50 steps a second, not 10 seconds. It is the usual place to put forces on a dynamic `Rigidbody`.

Courtyard Walk does not use `FixedUpdate`. `CharacterController.Move` is called from `Update`. The controller is not a dynamic rigidbody.

## Awake and Start

Workshop note: Awake runs first, once, before Start and Update, for settings. Start also runs once and "loads the script".

Awake running once before Start is right. Start does not load the script. Unity loads the script when the assembly is compiled. `Start` runs once, after `Awake` and `OnEnable`, before the first `Update`, if the component is enabled.

The original movement scripts contain an empty `Start`. Empty means the method does nothing. `CourtyardBootstrap` uses `Awake` to build the yard before the first `Update`.
