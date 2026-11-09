using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Score and restart state for one walk of the courtyard.
/// </summary>
public class CourtyardSession : MonoBehaviour
{
    public int collected;
    public int total;
    public string status = "Walk the courtyard and touch every orb.";
    public bool cleared;

    readonly List<GameObject> orbs = new List<GameObject>();
    Walker walker;

    public void Configure(Walker player, List<GameObject> orbObjects)
    {
        walker = player;
        orbs.Clear();
        orbs.AddRange(orbObjects);
        total = orbs.Count;
        collected = 0;
        cleared = false;
        status = "Walk the courtyard and touch every orb.";
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.R))
        {
            Restart();
        }
    }

    public void RegisterCollection()
    {
        collected = Mathf.Clamp(collected + 1, 0, total);
        if (total > 0 && collected >= total)
        {
            cleared = true;
            status = "Courtyard clear. Press R to walk it again.";
        }
        else
        {
            status = "Orb collected.";
        }
    }

    public void NotifyPad(Walker who)
    {
        who.RequestSpawnReturn();
        if (cleared)
        {
            status = "Courtyard clear. The pad only returns you to the start.";
        }
        else
        {
            status = "Reset pad. Orbs you already took stay taken.";
        }
    }

    public void Restart()
    {
        collected = 0;
        cleared = false;
        status = "Restarted. The orbs are back.";
        for (int i = 0; i < orbs.Count; i++)
        {
            if (orbs[i] != null)
            {
                orbs[i].SetActive(true);
            }
        }

        if (walker != null)
        {
            walker.ApplySpawn();
        }
    }
}
