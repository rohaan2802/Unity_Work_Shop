# Unity Work Shop

Unity 6 workshop portfolio for **Mohammad Rohaan** (FAST-NUCES, roll 22I-2327, GitHub [rohaan2802](https://github.com/rohaan2802)).

The workshop record is a Unity **6000.0.26f1** project: two movement scripts, study notes, `SampleScene`, and `vrscene`. Courtyard Walk is the scene that plays in this project. It is a yard of primitives with movement, collision, collectibles, a reset pad, and a HUD. The original scene files are kept under `workshop-evidence/` with their GUIDs. They are not imported into `Assets`, because `vrscene` points at other files that are not in this tree.

The canvas on the website is a **JavaScript concept illustration**. It is not a Unity player and it is not a WebGL build.

## Live links

| What | Link |
| --- | --- |
| Repository | https://github.com/rohaan2802/Unity_Work_Shop |
| GitHub Pages | https://rohaan2802.github.io/Unity_Work_Shop/ |
| Participation certificate | https://rohaan2802.github.io/Unity_Work_Shop/proof/techconnect-2024.pdf |

There is no GitHub Release for this portfolio. Do not look for a player zip on the Releases page. None was created.

## Table of contents

1. [Overview](#overview)
2. [Workshop evidence and portfolio extensions](#workshop-evidence-and-portfolio-extensions)
3. [Repository tree](#repository-tree)
4. [Folder, file, and script responsibilities](#folder-file-and-script-responsibilities)
5. [Architecture and data flow](#architecture-and-data-flow)
6. [Mechanics](#mechanics)
7. [Controls](#controls)
8. [Prerequisites, setup, play, and build](#prerequisites-setup-play-and-build)
9. [Notes and topic explanations](#notes-and-topic-explanations)
10. [Website](#website)
11. [Screenshots](#screenshots)
12. [Tests and the results that were actually recorded](#tests-and-the-results-that-were-actually-recorded)
13. [Limitations](#limitations)
14. [Troubleshooting](#troubleshooting)
15. [Provenance](#provenance)
16. [What you need in order to run it](#what-you-need-in-order-to-run-it)
17. [Ideas that are not in the scene yet](#ideas-that-are-not-in-the-scene-yet)
18. [Publishing this folder](#publishing-this-folder)
19. [What Unity regenerates](#what-unity-regenerates)
20. [About text and topics](#about-text-and-topics)
21. [Author](#author)

## Overview

`ProjectSettings/ProjectVersion.txt` in the workshop project recorded Editor **6000.0.26f1**, revision `ccb7c73d2c02`. `Packages/manifest.json` pulled Universal RP 17.0.3, Input System 1.11.2, Cinemachine 2.10.2, XR Interaction Toolkit 3.0.7, XR Management 4.5.0, and XR Oculus 4.3.0, among other packages. Graphics settings pointed at a URP asset. Active Input Handling was Both.

The handwritten gameplay was smaller than that package list. `CharacterController.cs` at the repository root and `NewMonoBehaviourScript.cs` under `Assets/character controller/` both read `Input.GetAxis("Horizontal")` and `Input.GetAxis("Vertical")` and write `transform.position`. Both accept the axis when it is greater than -2. `Unity Learning.txt` is a page of notes on the player loop, render pipelines, and Oculus Rift versus Quest 2 and Quest 3. `Unity Workshop_TXT.txt` pastes the movement script again and then a list of links, including a block the note itself labels as pirated sites. That block is not republished.

`SampleScene` is the template camera and light. The small `vrscene.unity` (39,578 bytes, GUID `3e5932c951cc1e643bbb37dd13e56fd6`) is an XR sandbox: inactive plane and camera, a light, an anchor, a teleportation anchor, an XR Interaction Manager, Starter Assets player prefabs, and the Ely and Ch08 characters. The movement script on the Ely instance is saved disabled.

`VRScene-imported.unity` (3,541,156 bytes, GUID `bf8efc1ea90408840a27a268a2f11032`) is a different file. It is the city layout, with 273 prefab GUIDs under the Polylised Medieval Desert City folder, Starter Assets player prefabs, and the same movement-script text attached, disabled, to `Ch15_nonPBR.fbx` (115,014,208 bytes, not included). Both scene files are under `workshop-evidence/scenes/`, outside `Assets`. Neither is in the build list. Courtyard Walk does not play them.

The workshop package list included URP 17.0.3, the Input System, Cinemachine, and the XR packages because those prefabs and the light and camera data use them. Courtyard Walk does not. It is a new scene of cubes, a capsule, five spheres, and a pad. The website explains the same ground rules. Relative links work in a folder and later under `/Unity_Work_Shop/` if Pages is enabled.

## Workshop evidence and portfolio extensions

| Workshop evidence | Portfolio extension |
| --- | --- |
| Two movement scripts with the axis test and `transform.position` | `Walker.cs` uses the axis value and `CharacterController.Move` |
| Empty `Start` on those scripts | Left empty in the preserved copies. The new bootstrap uses `Awake` |
| Notes that mis-state LateUpdate and FixedUpdate | Corrected pages next to the unchanged note |
| Notes that count pipelines incorrectly and call URP low quality | Pipeline page. Demo uses the built-in pipeline on purpose |
| URP project because Starter Assets required URP | Built-in `GraphicsSettings`, modules-only `manifest.json` |
| Input Handling Both, for Starter Assets plus legacy axes | Input Manager only, matching the script that was written |
| `vrscene` and Oculus settings | Described in the XR page. Not included. No VR rig in the demo |
| Starter Assets, K. Atienza meshes, Ch08 mesh, Polylised city | Not included |
| Lecture slides | Included under `proof/`. Presenter Usama Bin Imran. Participant line only. |
| Participation certificate | Included under `proof/`. Not an award. |
| Two selected photos and one recording | Linked from the home page under `proof/photos/` and `proof/video/`. The other photographs are not in this folder. |
| Windows player | Not in this folder. |
| No collectible loop in the handwritten script | Orbs, pad, restart, and IMGUI HUD are new |

Calling the courtyard a workshop deliverable would be false. The workshop deliverable was the imported project plus the short script. The courtyard is the study piece built from that script's idea.

## Repository tree

```text
Unity_Work_Shop/
├── index.html
├── css/site.css
├── js/site.js
├── js/concept-demo.js
├── favicon.svg
├── learning/
├── source/index.html
├── project/index.html
├── provenance/index.html
├── screenshots/index.html
├── docs/
│   ├── screenshots/          # 30 JPEG captures of this website
│   ├── corrections.md
│   └── unity-files.md
├── proof/
│   ├── techconnect-2024.pdf
│   ├── lecture-slides.pptx
│   ├── photos/workshop-dsc07283.jpg
│   ├── photos/workshop-img5587.jpg
│   └── video/unity-workshop.mp4
├── workshop-evidence/
│   ├── README.md
│   └── scenes/                 # SampleScene, small vrscene, and VRScene-imported.unity
├── notes/
│   ├── player-loop/Unity Learning.txt
│   ├── movement/CharacterController.cs
│   ├── movement/NewMonoBehaviourScript.cs
│   ├── links/Unity Workshop_TXT.redacted.txt
│   └── xr/xr-context.md
├── Assets/
│   ├── Scenes/CourtyardWalk.unity
│   ├── Scripts/Courtyard/
│   └── Editor/CourtyardSceneBuilder.cs
├── Packages/manifest.json
├── ProjectSettings/
├── tools/validate_portfolio.py
├── tests/courtyard_sim.test.js
├── README.md
├── NOTICE.md
├── .gitignore
├── .gitattributes
└── .nojekyll
```

## Folder, file, and script responsibilities

### Website

| Path | Responsibility |
| --- | --- |
| `index.html` | Home, live links, workshop versus extension, concept demo, outcomes, architecture, search |
| `css/site.css` | Light and dark themes, large type, mobile navigation, focus rings, reduced motion |
| `js/site.js` | Theme, menu, search filter, copy buttons, back-to-top, demo wiring |
| `js/concept-demo.js` | Top-down rules shared with `CourtyardLayout`. Not Unity |
| `learning/*.html` | Player loop, pipelines, movement, collision, XR |
| `source/index.html` | Readable scripts and copy buttons |
| `project/index.html` | Setup, controls, build steps, Editor limitation |
| `provenance/index.html` | Hashes, what was kept, what was excluded |
| `screenshots/index.html` | The same 30 images as this README, with captions |
| `favicon.svg` | Original mark drawn as vectors |

### Notes

| Path | Responsibility |
| --- | --- |
| `notes/player-loop/Unity Learning.txt` | Unchanged workshop note |
| `notes/player-loop/player-loop.md` | Corrections, with pointers into the scripts |
| `notes/movement/CharacterController.cs` | Unchanged root script. Not compiled |
| `notes/movement/NewMonoBehaviourScript.cs` | Unchanged asset script. Not compiled |
| `notes/movement/movement.md` | Why both files exist and what the bug is |
| `notes/links/Unity Workshop_TXT.redacted.txt` | Pasted script and official links. Unofficial download URLs removed |
| `notes/links/links.md` | Why the redaction exists |
| `notes/xr/xr-context.md` | Headset notes and the scene that stayed local |

### Unity scripts

| Path | Responsibility |
| --- | --- |
| `CourtyardLayout.cs` | Yard measurements. The JavaScript file copies these numbers |
| `CourtyardBootstrap.cs` | On `Awake`, builds the yard if `CourtyardRoot` is missing. This is the only script referenced by the scene file |
| `CourtyardBuild.cs` | Creates primitives, paints them, wires triggers, walker, camera, and light |
| `Walker.cs` | Legacy axes, gravity, `CharacterController.Move`, spawn return |
| `FollowCamera.cs` | `LateUpdate` follow |
| `CollectibleOrb.cs` | Trigger pickup |
| `ResetPad.cs` | Trigger spawn return without clearing score |
| `CourtyardSession.cs` | Count, clear message, R restart |
| `CourtyardHud.cs` | IMGUI score and controls |
| `CourtyardSceneBuilder.cs` | Editor menu that bakes the same yard and saves the scene |

Scene GUID `4f8a1c2d6e7b49a0b3c5d6e7f8091a2b` is the guid in `CourtyardWalk.unity.meta` and in `EditorBuildSettings`. Bootstrap script GUID `c0ffee01a11c4b0a9e5d11c0ffee0001` is the guid on the scene component. Other scripts get their `.meta` files so Unity does not invent new guids on import. They are attached with `AddComponent` at runtime, so the scene does not list them.

### Project settings that are required

`ProjectVersion.txt` pins 6000.0.26f1. `ProjectSettings.asset` names the product Courtyard Walk, company FAST-NUCES, bundle `com.fastnuces.CourtyardWalk`, version 1.0.0, and Input Manager. Cloud project id and organization id are blank. `GraphicsSettings.asset` has no URP asset. `InputManager.asset` is the workshop axis list (WASD and arrows), which the walker needs. `TimeManager.asset` keeps the 0.02 second fixed step so the note about FixedUpdate has a number to point at. `EditorBuildSettings.asset` enables only the courtyard scene and does not reference Oculus or the Input System actions asset. Quality, physics, audio, tags, and editor settings are the ordinary Unity files copied from the workshop project after the pipeline and account fields were cleared. `Packages/manifest.json` lists built-in modules only. There is no `packages-lock.json`; the Editor writes that when it resolves packages.

## Architecture and data flow

1. The Editor opens `CourtyardWalk.unity`. The saved objects are the light (the sample scene's light ids, warm directional light), the camera at (0, 8, -16), and `CourtyardBootstrap`.
2. Entering Play calls `CourtyardBootstrap.Awake`.
3. `GameObject.Find("CourtyardRoot")` either finds a yard already baked by the editor menu, or `CourtyardBuild.Create` makes one.
4. `Create` parents geometry under `CourtyardRoot`, adds `CourtyardSession` and `CourtyardHud` on the root, spawns orbs and the pad with kinematic rigidbodies, and builds the walker.
5. Each frame, `Walker.Update` reads axes, applies gravity on Y, and calls `Move`. `CourtyardSession.Update` listens for R. `FollowCamera.LateUpdate` eases the camera behind the capsule.
6. Trigger messages update the session. The HUD reads the session during `OnGUI`.
7. The website never loads this scene. `concept-demo.js` runs `createSim` with the same positions and resolves circles against the wall inner face, the block AABBs, and the column. `tests/courtyard_sim.test.js` drives that function in Node.

## Mechanics

Spawn is `(0, 1, -8)`. The capsule is 2 units tall with radius 0.5, so the feet sit on the ground cube whose top is y = 0. Speed is 5 units per second. Diagonal input is normalized. Gravity is -20, applied in `Update`, with a small downward stick when grounded so the controller stays snapped.

The yard half-extent is 12. Walls are 0.5 thick and 2.2 tall. Four blocks and one column (radius 0.6) sit inside. Five orbs of radius 0.45 sit at `(-8, 0.7, -6)`, `(8, 0.7, -4)`, `(7, 0.7, 7)`, `(-9, 0.7, 1)`, and `(1.5, 0.7, 0.5)`. The pad center is `(8, 0.75, -8)` with scale `(2.4, 1.5, 2.4)`. It is a trigger, so the walker can enter it.

Collecting the fifth orb sets the clear message. The pad teleports to spawn and does not reactivate orbs. R does both.

Colors are set on the primitive material at runtime (`_Color`, and `_BaseColor` if a shader has it). No texture files are shipped.

## Controls

| Input | Unity player | Browser illustration |
| --- | --- | --- |
| A D or left right | Horizontal axis | Same, when focus is not in the search box |
| W S or up down | Vertical axis, positive Z | Same |
| Touch pad N E S W | Not in the Unity HUD | Sets the stick while the pointer is down |
| R | Full restart | Full restart |
| Red pad | Spawn return, score kept | Same |
| Slash | | Focus the search box |

## Prerequisites, setup, play, and build

Prerequisites: Unity Hub and Editor 6000.0.26f1 if you want the 3D scene; a current browser if you only want the website and the canvas; Node if you want `tests/courtyard_sim.test.js`; Python 3 if you want `tools/validate_portfolio.py`. No paid assets and no extra npm packages are required to read the site.

Setup:

1. Use the folder that contains `Assets`, `Packages`, and `ProjectSettings`.
2. Hub, Add, select that folder. Let `Library` generate.
3. Open `Assets/Scenes/CourtyardWalk.unity`.
4. Press Play.

The Editor was **not** available while this tree was assembled. Treat the steps as the intended procedure, not as a log of a successful import. If Unity rewrites `ProjectVersion.txt` because a different patch is installed, that rewrite is the Editor's, and it should be reviewed before any later commit.

Build, when you have the Editor: File, Build Profiles, desktop target, build into a directory that is not committed. `.gitignore` ignores `Build/` and `Builds/`. Do not point the website at that output unless the files are actually published, and do not publish a build that you produced by dropping Starter Assets back in without checking the license.

Serve the site locally:

```text
python -m http.server 8765
```

Then open the printed local URL. Opening `index.html` directly also works because links are relative and search data is inside `site.js`, not fetched.

## Notes and topic explanations

Player loop, pipelines, movement, collision, and XR each have an HTML page under `learning/` and a markdown note under `notes/`. The HTML is what the website search indexes. The markdown is the same substance for someone reading the folder in an editor.

The pipeline page is explicit that the workshop Editor project was URP and the portfolio scene is built-in. The XR page is explicit that a teleport anchor in `vrscene` is not a finished game. The movement page is explicit that `> -2` does not filter axes.

## Website

- Type scale uses a serif display face from the operating system and a sans body at 1.125rem, with headings up to about 4.4rem on a wide screen.
- Light and dark themes meet a high-contrast intent: ink and muted text stay dark on the light paper and light on the dark paper. The toggle stores the choice in `localStorage` and respects `prefers-color-scheme` on the first visit. `prefers-reduced-motion` disables smooth scrolling and CSS transitions.
- The header becomes a Menu button below 800px. Escape closes it. The button uses `aria-expanded`.
- Search filters a catalog baked into `site.js` (so `file://` works) by text and by All, Learning, Source, Project, or Notes. An empty query with a chip still lists that kind. A query with no hits shows a sentence, not a blank hole.
- Copy buttons copy the associated `<pre>`.
- A skip link, visible `:focus-visible` rings, 48px targets, and a fixed **Top** control after you scroll. Its accessible name is Back to top. The footer does not repeat that link.
- Long URLs use `overflow-wrap`. Code blocks scroll inside their own box. Live links are cards, not a wide table, so a phone does not scroll sideways to read them.
- No WebGL launch control. The demo banner states the canvas is JavaScript.

## Screenshots

Thirty screenshots of this website: different pages, themes, and screen sizes. These are not pictures from the Unity Editor.

### 01. Home page live links

![Home page live links, light theme](docs/screenshots/01-desktop-light-live-links.jpg)

Home page live links, light theme.

### 02. Workshop overview

![Workshop overview, light theme](docs/screenshots/02-desktop-light-overview.jpg)

Workshop overview, light theme.

### 03. Workshop files next to the new courtyard work

![Workshop files next to the new courtyard work](docs/screenshots/03-desktop-light-workshop-vs-extension.jpg)

Workshop files next to the new courtyard work.

### 04. Concept demo at the start

![Concept demo at the start](docs/screenshots/04-desktop-light-demo-start.jpg)

Concept demo at the start.

### 05. Concept demo after moving

![Concept demo after moving](docs/screenshots/05-desktop-light-demo-moved.jpg)

Concept demo after moving.

### 06. Concept demo with two orbs collected

![Concept demo with two orbs collected](docs/screenshots/06-desktop-light-demo-collected.jpg)

Concept demo with two orbs collected.

### 07. Concept demo with all orbs collected

![Concept demo with all orbs collected](docs/screenshots/07-desktop-light-demo-clear.jpg)

Concept demo with all orbs collected.

### 08. Concept demo after hitting the reset pad

![Concept demo after hitting the reset pad](docs/screenshots/08-desktop-light-demo-pad.jpg)

Concept demo after hitting the reset pad.

### 09. Home page header

![Home page header, dark theme](docs/screenshots/09-desktop-dark-hero.jpg)

Home page header, dark theme.

### 10. Search for collision

![Search for collision, dark theme](docs/screenshots/10-desktop-dark-search-collision.jpg)

Search for collision, dark theme.

### 11. Search with no results

![Search with no results, dark theme](docs/screenshots/11-desktop-dark-search-empty.jpg)

Search with no results, dark theme.

### 12. Learning outcomes on the home page

![Learning outcomes on the home page](docs/screenshots/12-desktop-light-outcomes.jpg)

Learning outcomes on the home page.

### 13. Courtyard Walk architecture

![Courtyard Walk architecture](docs/screenshots/13-desktop-light-architecture.jpg)

Courtyard Walk architecture.

### 14. Home page on a tablet

![Home page on a tablet](docs/screenshots/14-tablet-light-home.jpg)

Home page on a tablet.

### 15. Concept demo on a tablet

![Concept demo on a tablet, dark theme](docs/screenshots/15-tablet-dark-demo.jpg)

Concept demo on a tablet, dark theme.

### 16. Home page on a phone

![Home page on a phone, menu closed](docs/screenshots/16-mobile-light-home.jpg)

Home page on a phone, menu closed.

### 17. Home page on a phone

![Home page on a phone, menu open](docs/screenshots/17-mobile-light-nav.jpg)

Home page on a phone, menu open.

### 18. Concept demo on a phone

![Concept demo on a phone, dark theme](docs/screenshots/18-mobile-dark-demo.jpg)

Concept demo on a phone, dark theme.

### 19. Search for walker on a phone

![Search for walker on a phone](docs/screenshots/19-mobile-light-search.jpg)

Search for walker on a phone.

### 20. Player-loop notes

![Player-loop notes](docs/screenshots/20-learning-player-loop.jpg)

Player-loop notes.

### 21. Render pipeline notes

![Render pipeline notes, dark theme](docs/screenshots/21-learning-pipelines-dark.jpg)

Render pipeline notes, dark theme.

### 22. Movement notes and the axis check

![Movement notes and the axis check](docs/screenshots/22-learning-movement.jpg)

Movement notes and the axis check.

### 23. Collision

![Collision, collectibles, and reset notes](docs/screenshots/23-learning-collision.jpg)

Collision, collectibles, and reset notes.

### 24. XR notes

![XR notes](docs/screenshots/24-learning-xr.jpg)

XR notes.

### 25. Original movement script in the source reader

![Original movement script in the source reader](docs/screenshots/25-source-original.jpg)

Original movement script in the source reader.

### 26. Walker.cs in the source reader

![Walker.cs in the source reader, dark theme](docs/screenshots/26-source-walker-dark.jpg)

Walker.cs in the source reader, dark theme.

### 27. Project setup for Unity 6000.0.26f1

![Project setup for Unity 6000.0.26f1](docs/screenshots/27-project-setup.jpg)

Project setup for Unity 6000.0.26f1.

### 28. What was left out of this copy

![What was left out of this copy](docs/screenshots/28-provenance-exclusions.jpg)

What was left out of this copy.

### 29. Footer and the back-to-top button

![Footer and the back-to-top button](docs/screenshots/29-footer-back-to-top.jpg)

Footer and the back-to-top button.

### 30. Learning filter on the home page

![Learning filter on the home page, dark theme](docs/screenshots/30-desktop-dark-learning-filter.jpg)

Learning filter on the home page, dark theme.


## Tests and the results that were actually recorded

Command:

```text
node tests/courtyard_sim.test.js
```

Result recorded for this tree:

```text
courtyard_sim.test.js: 14 checks passed
collected 2 clear 5 pad Reset pad. Orbs you already took stay taken.
```

The checks cover the workshop comparison `value > -2` on samples from -1 to 1; zero input; a one-second move at speed 5 on X and on Z; the diagonal speed cap; the west wall; staying outside the first block and outside the column; two orbs; all five orbs and the clear flag; the pad returning to spawn with the score kept; restart restoring five orbs; orbs not sitting inside blocks or walls; and a collected orb not counting twice. These exercise `js/concept-demo.js` only.

Command:

```text
python tools/validate_portfolio.py
```

That script checks the tree shape, the 30 screenshot files, README image paths, internal links, forbidden names, the bootstrap GUID, and the shared layout numbers. Its output is the pass or fail of the file set. It does not open Unity.

Not run, and not claimed:

- Unity Editor import of `CourtyardWalk.unity`
- Play Mode
- A player build
- WebGL
- A headset
- GitHub Pages

## Limitations

- Collision and triggers are written against Unity's `CharacterController` and were not executed in the Editor here. The Node tests cover the JavaScript twin of the ground rules only.
- IMGUI styling depends on the Editor's default skin. The code tints a box and sets font sizes. A different skin can change the chrome.
- Primitive colors are assigned to `renderer.material` at runtime. The editor-menu bake can look different after a domain reload if Unity does not keep those material instances. Pressing Play builds the colored yard again.
- The scene YAML reuses the workshop sample scene's light and camera structure, with the camera moved and the bootstrap appended. Unity may reserialize it on first open.
- Blank cloud project id means the Editor may ask to bind a Unity account. That is intentional. The old organization id is not copied.
- Search covers the catalog in `site.js`. A new page is invisible to search until that list is updated.
- `vrscene` is evidence. It is not a scene this project can play until the prefabs it names are restored with it.
- The Node tests do not compile the C# and do not prove `OnTriggerEnter` in the Editor. The pad defers the teleport until `CharacterController.Move` has returned, because disabling the controller inside the trigger callback is unsafe. That deferral is in `Walker.cs`. The canvas applies the pad in the same step.

## Troubleshooting

| What you see | What to check |
| --- | --- |
| Walker does not move | Active Input Handling must be Input Manager (Old), not Input System Package only |
| Pink objects | Graphics settings should have no custom render pipeline. If the Editor assigned URP, clear that asset |
| Missing script on CourtyardBootstrap | `CourtyardBootstrap.cs.meta` guid must stay `c0ffee01a11c4b0a9e5d11c0ffee0001` |
| Two yards | Delete the extra `CourtyardRoot`, or stop if the bootstrap already found one |
| Orbs do not fire | The orb needs a kinematic Rigidbody and a trigger collider. `CourtyardBuild` adds both |
| Website has no style | Open from the folder root so `css/site.css` resolves. A relative link breaks if the HTML is moved alone |
| Pages 404 after you publish | Repository name must match the Pages URL. Deploy from the branch root. `.nojekyll` is present so Jekyll does not hide files |
| `vrscene` shows missing prefabs | It is outside `Assets` on purpose. Do not copy it into this project without the Starter Assets prefabs, the character files, URP, and the XR package it already references |

## Provenance

Originals kept byte-for-byte:

| File | SHA-256 |
| --- | --- |
| `notes/movement/CharacterController.cs` | `861f50ea66501f2296b2a2fbec5bf4457bb9a1f01ca6911d1067b2f93c6da49c` |
| `notes/movement/NewMonoBehaviourScript.cs` | `56de785ea5612a817ba0a71cdb4c375dd9d1cb031516384cfdd5f9303c843403` |
| `notes/player-loop/Unity Learning.txt` | `5657987aee7c68aaf2b4b6f0675f62355d0cb7154e35adf35e0c2e44b5088385` |

The asset script on the original Desktop was the same characters with CRLF (679 bytes). One copy is kept.

`Unity Workshop_TXT.txt` is not byte-identical in this tree. The publishable file is `notes/links/Unity Workshop_TXT.redacted.txt`. The change is the removal of the unofficial download list and an external drive link whose contents were not reviewed for redistribution.

Equal-hash workshop text already in the Git tree was not duplicated. Differing movement scripts were both kept. The October 2024 `My project` template (URP, mobile feature set) is a different project and is not part of Courtyard Walk.

Corrections are listed in [docs/corrections.md](docs/corrections.md). Scene references are listed in [workshop-evidence/README.md](workshop-evidence/README.md).

## What you need in order to run it

The scripts and the scene are not a standalone program. On a PC that can run Unity 6:

1. Install Unity Hub and Editor 6000.0.26f1, with a license Hub accepts.
2. Add the folder that contains `Assets`, `Packages`, and `ProjectSettings`.
3. Open `Assets/Scenes/CourtyardWalk.unity` and press Play.

A built player is a later step from that same Editor: File, Build Profiles, desktop target. This tree has no player in it. The browser page is JavaScript.

## Ideas that are not in the scene yet

These are next steps, not features that already run.

- Restore `vrscene` only as a second project, or only after the Starter Assets prefabs, both character files, URP, and the XR package are beside that scene file. Then enable `NewMonoBehaviourScript` only after the class name no longer hides `CharacterController`.
- Add a jump on the walker if a later pass wants one. The current controller stays on the ground.
- Keep Courtyard Walk on the Input Manager. An Input System version would be a separate script, not a silent swap.

## Publishing this folder

Suggested repository name: **Unity_Work_Shop**. Pages, when you turn them on, serve this root. `.nojekyll` is included. No Release is required for Courtyard Walk, and the site does not link to one.

`.gitignore` ignores Library, Temp, Obj, Logs, UserSettings, Build, and generated solution files. `.gitattributes` does not add a large-file filter.

Starter Assets, the character meshes, and the desert-city pack are not in this folder. Their licenses are named in the provenance page. They are not marked clear to publish, and they are not marked forbidden. A Release of a large file would still be a public upload, and nothing here depends on one.

## What Unity regenerates

| Regenerated, omitted on purpose | Required, present |
| --- | --- |
| `Library/`, `Temp/`, `obj/`, `Logs/`, `UserSettings/` | `Assets/`, `Packages/manifest.json`, `ProjectSettings/` |
| `Assembly-CSharp.csproj`, `workshop.sln`, and the other generated projects. They contained a Visual Studio analyzer path and are not handwritten rules | `.meta` files next to scripts, folders, and the scene |
| `packages-lock.json` | `ProjectVersion.txt` |
| Lighting data, navmesh caches | `CourtyardWalk.unity` and `EditorBuildSettings.asset` |
| A player under `builds/` | The scripts that build the yard at Play |

The workshop movement scripts are the files under `notes/movement/`. Unity writes a fresh solution when the runnable project is opened.

## About text and topics

Suggested description:

> Unity 6 workshop notes and Courtyard Walk, an original primitive scene for movement, collision, collectibles, reset, and a HUD. Third-party workshop assets are not included.

Suggested topics: `unity`, `unity6`, `csharp`, `game-development`, `workshop`, `fast-nuces`.

Suggested website field, only after Pages works: `https://rohaan2802.github.io/Unity_Work_Shop/`.

## Author

**Mohammad Rohaan** · BS Computer Science, FAST-NUCES · roll 22I-2327 · [github.com/rohaan2802](https://github.com/rohaan2802)
