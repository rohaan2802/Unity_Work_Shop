# XR and vrscene

## Headset notes

`Unity Learning.txt` says an Oculus Rift has no processor of its own and uses the computer, that Quest 2 is Android-based with its own battery and a store, and that Quest 3 has a stronger processor, more RAM, and better cameras than Quest 2. Those are the workshop sentences. They were not rechecked on a headset for this portfolio.

## What vrscene contains

The saved scene is described in `workshop-evidence/README.md`. Short version: a plane and the main camera are inactive, a directional light is present, and the hierarchy includes an anchor, a teleportation anchor, and an XR Interaction Manager. Prefab instances reference the Starter Assets third-person player and follow camera, plus the Ely and Ch08 character files.

The workshop movement script is on the Ely instance and is disabled. The scene also stores Universal RP light and camera components. Those package scripts are not custom code.

Courtyard Walk does not contain an XR rig. Nothing here is a finished VR project. `vrscene` stays outside `Assets` until the prefabs and packages it names are restored together. Copying the YAML in alone does not make that scene playable.
