using UnityEngine;

/// <summary>
/// Runs in LateUpdate so the camera follows the walker after Update has moved it.
/// LateUpdate still runs every frame. It is not a one-shot timer.
/// </summary>
public class FollowCamera : MonoBehaviour
{
    public Transform target;
    public Vector3 offset = new Vector3(0f, 7.5f, -9f);
    public float followSharpness = 6f;

    void LateUpdate()
    {
        if (target == null)
        {
            return;
        }

        Vector3 desired = target.position + offset;
        float blend = 1f - Mathf.Exp(-followSharpness * Time.deltaTime);
        transform.position = Vector3.Lerp(transform.position, desired, blend);
        transform.LookAt(target.position + Vector3.up * 1.2f);
    }
}
