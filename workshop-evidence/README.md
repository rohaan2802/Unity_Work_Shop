# Workshop scenes

These files are saved Unity scenes from the workshop. They sit outside `Assets`, so opening Courtyard Walk does not import them. None of them is in `EditorBuildSettings`. None of them is a scene this project can play.

Courtyard Walk is a later practice scene for the movement script: primitives, collision, orbs, a reset pad, and a HUD. It is not the city scene and it is not a workshop deliverable.

## Seven snapshots

The same display name is not the same file. GUIDs and sizes differ.

| Copy | Bytes | Scene GUID | What it is |
| --- | --- | --- | --- |
| `scenes/SampleScene.unity` (Desktop and the repository copy share this GUID) | 7055 Desktop, 7322 repository | `9fc0d4010bbf28b4594072e72b8655ab` | Template camera and directional light. Built-in object references only. The repository file is the same scene with different line endings. |
| `scenes/vrscene.unity` | 39578 Desktop, 40794 repository | `3e5932c951cc1e643bbb37dd13e56fd6` | Small XR sandbox. Plane and Main Camera are inactive. Also a light, an anchor, a teleportation anchor, and an XR Interaction Manager. The repository file is the CRLF form of that scene. |
| Imported `scenes/SampleScene.unity` is not copied here | 23715 | `9fc0d4010bbf28b4594072e72b8655ab` | Same GUID as the Desktop sample scene, larger file. Kept with the imported project, not merged into Courtyard Walk. |
| `scenes/VRScene-imported.unity` | 3541156 | `bf8efc1ea90408840a27a268a2f11032` | Different scene from `vrscene.unity`. City layout plus XR. Not runnable in this project. |
| URP template SampleScene | 11413 | `99c9720ab356a0642a771bea13969a05` | A different Unity template. Not the workshop scene. Not included. |

`scenes/vrscene.unity` and `scenes/SampleScene.unity` in this folder are the Desktop snapshots.

## What VRScene-imported.unity contains

The file is 84,420 lines. It has 2,511 prefab instances. 286 distinct GUIDs are referenced. Of those, 273 resolve to prefabs under `Polylised - Medieval Desert City` in the imported project. Those prefab bytes are not in this tree.

Named objects include city pieces such as `Terrain`, `Vegetation`, `walls_segment_01` through `walls_segment_14`, `city_gate_02`, `citadel_gate`, `port_wall_group_02`, `port_wooden_bridges`, `fences`, and numbered `Block_` pieces, plus a few `Cube` objects and a `Plane`.

Also present:

- XR Interaction Manager, enabled. Its script GUID `83e4e6cca11330d4088d729ab4fc9d9f` is not a file in the workshop `Assets` folder. It belongs to the XR Interaction Toolkit package.
- Starter Assets prefabs `PlayerArmature` (82,683 bytes), `PlayerFollowCamera` (4,441 bytes), and `MainCamera` (4,551 bytes). Those prefabs pull in the rest of Starter Assets. Starter Assets `license.txt` says the package is under the Unity Companion License and points to Unity's license page. That identifies the license. It does not decide whether the package may be posted.
- One added script, GUID `acbb11b919ab48e4d949ae1887a16d60`, on prefab GUID `74ce3304d9b12a9488b8ba2eefdc85e2`. That prefab is `Ch15_nonPBR.fbx`, 115,014,208 bytes, which is not in this tree. The script file is the same 630 bytes as `notes/movement/CharacterController.cs`. The component is saved with `m_Enabled: 0`. It was attached and left off.
- Universal RP light data, script GUID `474bcb49853aa07438625e644c072ee6`, which ships inside the URP package.

The small `vrscene.unity` is a different GUID. On that file the movement script uses GUID `8da2fb2bc5e016b46a58a9a76e50a30f` (`NewMonoBehaviourScript.cs`) and is also saved disabled, on the Ely character rather than on `Ch15_nonPBR.fbx`.

## Not a playable scene here

Copying `VRScene-imported.unity` into `Assets/Scenes` of Courtyard Walk would not make a city. The meshes, the Polylised prefabs, URP, the XR package, and Starter Assets are absent. The Editor would report missing references. There is no short list of files that replaces that set. The city folder, the 115,014,208-byte character, the Starter Assets player, and those packages have to be present together, in a project whose settings match the imported project, not mixed into Courtyard Walk's built-in pipeline settings.

A documentation PDF of 3,964,468 bytes sits in the Polylised folder. It is image pages. No separate license sentence was extracted from it. It is not included here.

The lecture deck is `proof/lecture-slides.pptx`. It keeps 17 slides. The presenter line is still Usama Bin Imran. One added title line reads Mohammad Rohaan — Workshop participant. That line does not make the deck his authorship. The participation certificate is `proof/techconnect-2024.pdf`: TechConnect 2024 Unity Basics Bootcamp Competition. It records participation, not an award. The home page also links `proof/photos/workshop-dsc07283.jpg`, `proof/photos/workshop-img5587.jpg`, and `proof/video/unity-workshop.mp4`. The other photographs are not in this folder.
