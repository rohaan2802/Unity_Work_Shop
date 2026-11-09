# Movement scripts

Two workshop scripts are kept because the text is not the same.

`CharacterController.cs` was at the project root. It adds the axis with `+=`. The class name is `CharacterController`, the same simple name as Unity's `CharacterController` component. That file is not under `Assets` here, so the runnable project does not compile it.

`NewMonoBehaviourScript.cs` was `Assets/character controller/NewMonoBehaviourScript.cs`. It writes `transform.position = transform.position + ...`. Its meta GUID is `8da2fb2bc5e016b46a58a9a76e50a30f`. In `vrscene` that GUID is an added component on the Ely model, saved disabled (`m_Enabled: 0`). See `workshop-evidence/README.md`.

A Desktop copy of `NewMonoBehaviourScript.cs` was the same characters with Windows CRLF line endings (679 bytes against 653 bytes here). That is one script.

## The comparison

Both scripts move when `Input.GetAxis` is greater than -2. Horizontal and Vertical in `InputManager.asset` return about -1 to 1. Every value in that range is greater than -2, so the test does not reject a direction. Zero still passes the test and adds a zero vector.

`Walker` does not use that comparison. It uses the axis as a direction, keeps the length at most 1, and calls `CharacterController.Move`.

## Input setting

The workshop player settings used Active Input Handling set to Both, because Starter Assets uses the Input System package and the handwritten script uses `Input.GetAxis`. Courtyard Walk sets the Input Manager only (`activeInputHandler: 0`). `GetAxis` reads the axes in `InputManager.asset`. If that setting is changed to Input System Package only, the walker will not see A, D, W, or S.
