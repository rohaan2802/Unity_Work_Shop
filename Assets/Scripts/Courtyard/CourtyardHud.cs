using UnityEngine;

/// <summary>
/// Immediate-mode HUD. It uses the built-in IMGUI module so the scene does not
/// need a Canvas, a font asset, or TextMeshPro.
/// </summary>
public class CourtyardHud : MonoBehaviour
{
    public CourtyardSession session;

    void OnGUI()
    {
        if (session == null)
        {
            return;
        }

        float scale = Mathf.Max(1f, Screen.height / 900f);
        Matrix4x4 previous = GUI.matrix;
        GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, new Vector3(scale, scale, 1f));

        float width = Mathf.Min(540f, (Screen.width / scale) - 32f);
        GUIStyle title = new GUIStyle(GUI.skin.label);
        title.fontSize = 28;
        title.fontStyle = FontStyle.Bold;
        title.normal.textColor = Color.white;
        title.wordWrap = true;

        GUIStyle body = new GUIStyle(GUI.skin.label);
        body.fontSize = 20;
        body.wordWrap = true;
        body.normal.textColor = new Color(0.97f, 0.94f, 0.88f);

        Color previousColor = GUI.color;
        GUI.color = new Color(0.11f, 0.09f, 0.08f, 0.86f);
        GUI.Box(new Rect(16f, 16f, width, 230f), GUIContent.none);
        GUI.color = previousColor;

        float x = 32f;
        float y = 28f;
        GUI.Label(new Rect(x, y, width - 32f, 40f), "Courtyard Walk", title);
        y += 44f;
        GUI.Label(new Rect(x, y, width - 32f, 32f), "Orbs " + session.collected + " / " + session.total, body);
        y += 34f;
        GUI.Label(new Rect(x, y, width - 32f, 72f), session.status, body);
        y += 74f;
        GUI.Label(new Rect(x, y, width - 32f, 64f), "WASD or arrow keys. The red pad returns you to the start. R restarts.", body);

        GUI.matrix = previous;
    }
}
