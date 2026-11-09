# Corrections

The original files are unchanged. These are the mistakes the new pages and the new scripts address.

1. `Input.GetAxis` is about -1 to 1. The condition `> -2` in both workshop scripts is true for every sample in that range. `Walker` does not use the condition.
2. Assigning `transform.position` does not collide. `Walker` uses `CharacterController.Move`.
3. A class named `CharacterController` collides with `UnityEngine.CharacterController`. The running script is named `Walker`. The originals stay outside `Assets`.
4. `LateUpdate` runs every frame after `Update`. The note's "skip once" wording is wrong. `FollowCamera` uses `LateUpdate`.
5. `FixedUpdate` follows the fixed timestep, 0.02 seconds in `TimeManager.asset`, not a 10 second timer. The demo does not use `FixedUpdate` because the walker is a CharacterController.
6. The note says there are three pipelines and lists four. Built-in, URP, and HDRP are the pipeline choices discussed here. URP and HDRP are Scriptable Render Pipelines. SRP is the framework, not a separate quality level. URP is not "low quality only".
7. The workshop project used URP 17.0.3 and Active Input Handling Both. This demo uses the built-in pipeline and the Input Manager so it matches the handwritten script and does not require Starter Assets.
8. Unofficial download URLs from `Unity Workshop_TXT.txt` are omitted from the redacted copy.
9. `vrscene` is a saved workshop scene. The movement script on the Ely instance is disabled. The scene is kept outside `Assets` because it references Starter Assets, two character files, URP, and the XR Interaction Toolkit. It is not described as a completed VR project, and it is not described as playable in Courtyard Walk.
10. The reset pad asks `Walker` to return to spawn and `Walker` does that after `CharacterController.Move` returns. Doing it inside `OnTriggerEnter` would disable the controller while `Move` is still on the stack.
