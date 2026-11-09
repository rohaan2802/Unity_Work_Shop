using UnityEngine;

/// <summary>
/// Trigger orb. A kinematic Rigidbody is required so Unity sends OnTriggerEnter
/// when a CharacterController moves into the trigger.
/// </summary>
public class CollectibleOrb : MonoBehaviour
{
    CourtyardSession session;

    public void Bind(CourtyardSession owner)
    {
        session = owner;
    }

    void OnTriggerEnter(Collider other)
    {
        if (!isActiveAndEnabled)
        {
            return;
        }

        Walker walker = other.GetComponent<Walker>();
        if (walker == null)
        {
            walker = other.GetComponentInParent<Walker>();
        }

        if (walker == null)
        {
            return;
        }

        gameObject.SetActive(false);
        if (session != null)
        {
            session.RegisterCollection();
        }
    }
}
