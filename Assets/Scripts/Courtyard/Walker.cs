using UnityEngine;

/// <summary>
/// Walks with the legacy Input Manager. The workshop scripts named a class
/// CharacterController and moved by writing transform.position whenever the
/// axis was greater than -2. That test is true for every real axis value, and
/// writing the position ignores colliders. This component uses the engine
/// CharacterController and the axis value itself.
/// </summary>
[RequireComponent(typeof(CharacterController))]
public class Walker : MonoBehaviour
{
    public float speed = CourtyardLayout.MoveSpeed;
    public float gravity = CourtyardLayout.Gravity;
    public Vector3 spawn = CourtyardLayout.Spawn;

    CharacterController body;
    float verticalVelocity;
    bool returnPending;

    void Awake()
    {
        body = GetComponent<CharacterController>();
    }

    void Update()
    {
        if (returnPending)
        {
            returnPending = false;
            ApplySpawn();
        }

        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        Vector3 wish = new Vector3(horizontal, 0f, vertical);
        if (wish.sqrMagnitude > 1f)
        {
            wish.Normalize();
        }

        if (body.isGrounded && verticalVelocity < 0f)
        {
            verticalVelocity = -1f;
        }

        verticalVelocity += gravity * Time.deltaTime;

        Vector3 motion = wish * speed;
        motion.y = verticalVelocity;
        body.Move(motion * Time.deltaTime);

        // Trigger messages arrive inside Move. The pad only sets a flag.
        // Teleporting here is after Move has returned.
        if (returnPending || transform.position.y < -4f)
        {
            returnPending = false;
            ApplySpawn();
            return;
        }

        if (wish.sqrMagnitude > 0.0001f)
        {
            Quaternion face = Quaternion.LookRotation(wish, Vector3.up);
            float turn = 1f - Mathf.Exp(-10f * Time.deltaTime);
            transform.rotation = Quaternion.Slerp(transform.rotation, face, turn);
        }
    }

    /// <summary>
    /// Used by the reset pad. Safe to call from OnTriggerEnter because the
    /// actual teleport waits until Move has returned.
    /// </summary>
    public void RequestSpawnReturn()
    {
        returnPending = true;
    }

    /// <summary>
    /// Used by the R-key restart, which runs from Update and is not inside Move.
    /// </summary>
    public void ApplySpawn()
    {
        if (body == null)
        {
            body = GetComponent<CharacterController>();
        }

        body.enabled = false;
        transform.SetPositionAndRotation(spawn, Quaternion.identity);
        body.enabled = true;
        verticalVelocity = 0f;
        returnPending = false;
    }
}
