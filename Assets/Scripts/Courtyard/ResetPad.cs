using UnityEngine;

/// <summary>
/// Returns the walker to the spawn point. Collected orbs stay collected.
/// The R key, handled by CourtyardSession, is the full restart.
/// </summary>
public class ResetPad : MonoBehaviour
{
    CourtyardSession session;

    public void Bind(CourtyardSession owner)
    {
        session = owner;
    }

    void OnTriggerEnter(Collider other)
    {
        Walker walker = other.GetComponent<Walker>();
        if (walker == null)
        {
            walker = other.GetComponentInParent<Walker>();
        }

        if (walker == null || session == null)
        {
            return;
        }

        session.NotifyPad(walker);
    }
}
