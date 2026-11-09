using UnityEngine;

/// <summary>
/// Builds Courtyard Walk on Play when the scene does not already contain it.
/// The checked-in scene only has a light, a camera, and this component.
/// </summary>
public class CourtyardBootstrap : MonoBehaviour
{
    void Awake()
    {
        if (GameObject.Find("CourtyardRoot") != null)
        {
            return;
        }

        CourtyardBuild.Create();
    }
}
