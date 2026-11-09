using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

/// <summary>
/// Bakes the same primitives the play-mode bootstrap creates, then saves the scene.
/// Play already works without this menu. Use it when you want the hierarchy visible
/// before entering Play mode.
/// </summary>
public static class CourtyardSceneBuilder
{
    const string ScenePath = "Assets/Scenes/CourtyardWalk.unity";

    [MenuItem("Workshop/Build Courtyard Walk Scene")]
    public static void BuildAndSave()
    {
        EditorSceneManager.OpenScene(ScenePath, OpenSceneMode.Single);
        GameObject existing = GameObject.Find("CourtyardRoot");
        if (existing != null)
        {
            Object.DestroyImmediate(existing);
        }

        CourtyardBuild.Create();
        EditorSceneManager.MarkSceneDirty(EditorSceneManager.GetActiveScene());
        EditorSceneManager.SaveScene(EditorSceneManager.GetActiveScene(), ScenePath);
        Debug.Log("Saved Courtyard Walk to " + ScenePath);
    }
}
