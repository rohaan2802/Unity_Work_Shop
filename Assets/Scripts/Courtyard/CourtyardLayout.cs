using UnityEngine;

/// <summary>
/// Shared sizes for Courtyard Walk. The browser concept illustration copies these
/// numbers so the ground-plane rules match. It is not a Unity build.
/// </summary>
public static class CourtyardLayout
{
    public const float ArenaHalf = 12f;
    public const float WallThickness = 0.5f;
    public const float PlayerRadius = 0.5f;
    public const float MoveSpeed = 5f;
    public const float Gravity = -20f;
    public const float OrbRadius = 0.45f;
    public const float ColumnRadius = 0.6f;

    public static readonly Vector3 Spawn = new Vector3(0f, 1f, -8f);
    public static readonly Vector3 PadCenter = new Vector3(8f, 0.75f, -8f);
    public static readonly Vector3 PadScale = new Vector3(2.4f, 1.5f, 2.4f);
    public static readonly Vector3 ColumnCenter = new Vector3(3f, 1f, -4f);

    public static readonly Vector3[] Orbs =
    {
        new Vector3(-8f, 0.7f, -6f),
        new Vector3(8f, 0.7f, -4f),
        new Vector3(7f, 0.7f, 7f),
        new Vector3(-9f, 0.7f, 1f),
        new Vector3(1.5f, 0.7f, 0.5f)
    };

    public static readonly Vector3[] Blocks =
    {
        new Vector3(4f, 1f, 2f),
        new Vector3(-5f, 1f, 5f),
        new Vector3(-1f, 1f, 8f),
        new Vector3(-3.2f, 0.5f, -2f)
    };

    public static readonly Vector3[] BlockScales =
    {
        new Vector3(2f, 2f, 2f),
        new Vector3(3f, 2f, 1.6f),
        new Vector3(2f, 2f, 2f),
        new Vector3(2.2f, 1f, 2.2f)
    };
}
