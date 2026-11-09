using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Builds the courtyard from primitives. Play mode and the editor menu both call Create.
/// </summary>
public static class CourtyardBuild
{
    public static GameObject Create()
    {
        GameObject root = new GameObject("CourtyardRoot");
        CourtyardSession session = root.AddComponent<CourtyardSession>();
        CourtyardHud hud = root.AddComponent<CourtyardHud>();
        hud.session = session;

        CreateGround(root.transform);
        CreateWalls(root.transform);
        CreateBlocks(root.transform);
        CreateColumn(root.transform);
        List<GameObject> orbs = CreateOrbs(root.transform, session);
        CreatePad(root.transform, session);
        Walker walker = CreateWalker(root.transform);
        session.Configure(walker, orbs);
        AttachCamera(walker.transform);
        TuneLight();
        return root;
    }

    static void CreateGround(Transform parent)
    {
        GameObject ground = GameObject.CreatePrimitive(PrimitiveType.Cube);
        ground.name = "Ground";
        ground.transform.SetParent(parent, false);
        float span = CourtyardLayout.ArenaHalf * 2f + 1f;
        ground.transform.position = new Vector3(0f, -0.5f, 0f);
        ground.transform.localScale = new Vector3(span, 1f, span);
        Paint(ground, new Color(0.76f, 0.66f, 0.48f));
    }

    static void CreateWalls(Transform parent)
    {
        float edge = CourtyardLayout.ArenaHalf;
        float span = CourtyardLayout.ArenaHalf * 2f;
        float thick = CourtyardLayout.WallThickness;
        float height = 2.2f;
        float y = height * 0.5f;
        Wall(parent, "Wall North", new Vector3(0f, y, edge), new Vector3(span, height, thick));
        Wall(parent, "Wall South", new Vector3(0f, y, -edge), new Vector3(span, height, thick));
        Wall(parent, "Wall East", new Vector3(edge, y, 0f), new Vector3(thick, height, span));
        Wall(parent, "Wall West", new Vector3(-edge, y, 0f), new Vector3(thick, height, span));
    }

    static void Wall(Transform parent, string name, Vector3 position, Vector3 scale)
    {
        GameObject wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
        wall.name = name;
        wall.transform.SetParent(parent, false);
        wall.transform.position = position;
        wall.transform.localScale = scale;
        Paint(wall, new Color(0.45f, 0.38f, 0.32f));
    }

    static void CreateBlocks(Transform parent)
    {
        for (int i = 0; i < CourtyardLayout.Blocks.Length; i++)
        {
            GameObject block = GameObject.CreatePrimitive(PrimitiveType.Cube);
            block.name = "Block " + (i + 1);
            block.transform.SetParent(parent, false);
            block.transform.position = CourtyardLayout.Blocks[i];
            block.transform.localScale = CourtyardLayout.BlockScales[i];
            Paint(block, new Color(0.55f, 0.47f, 0.39f));
        }
    }

    static void CreateColumn(Transform parent)
    {
        GameObject column = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        column.name = "Column";
        column.transform.SetParent(parent, false);
        column.transform.position = CourtyardLayout.ColumnCenter;
        column.transform.localScale = new Vector3(CourtyardLayout.ColumnRadius * 2f, 1f, CourtyardLayout.ColumnRadius * 2f);
        Paint(column, new Color(0.63f, 0.56f, 0.47f));
    }

    static List<GameObject> CreateOrbs(Transform parent, CourtyardSession session)
    {
        List<GameObject> list = new List<GameObject>();
        for (int i = 0; i < CourtyardLayout.Orbs.Length; i++)
        {
            GameObject orb = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            orb.name = "Orb " + (i + 1);
            orb.transform.SetParent(parent, false);
            orb.transform.position = CourtyardLayout.Orbs[i];
            orb.transform.localScale = Vector3.one * (CourtyardLayout.OrbRadius * 2f);
            SphereCollider collider = orb.GetComponent<SphereCollider>();
            collider.isTrigger = true;
            Rigidbody body = orb.AddComponent<Rigidbody>();
            body.isKinematic = true;
            body.useGravity = false;
            orb.AddComponent<CollectibleOrb>().Bind(session);
            Paint(orb, new Color(0.93f, 0.76f, 0.28f));
            list.Add(orb);
        }

        return list;
    }

    static void CreatePad(Transform parent, CourtyardSession session)
    {
        GameObject pad = GameObject.CreatePrimitive(PrimitiveType.Cube);
        pad.name = "Reset Pad";
        pad.transform.SetParent(parent, false);
        pad.transform.position = CourtyardLayout.PadCenter;
        pad.transform.localScale = CourtyardLayout.PadScale;
        BoxCollider collider = pad.GetComponent<BoxCollider>();
        collider.isTrigger = true;
        Rigidbody body = pad.AddComponent<Rigidbody>();
        body.isKinematic = true;
        body.useGravity = false;
        pad.AddComponent<ResetPad>().Bind(session);
        Paint(pad, new Color(0.72f, 0.22f, 0.18f));
    }

    static Walker CreateWalker(Transform parent)
    {
        GameObject player = GameObject.CreatePrimitive(PrimitiveType.Capsule);
        player.name = "Walker";
        player.transform.SetParent(parent, false);
        player.transform.position = CourtyardLayout.Spawn;
        // The primitive brings its own capsule collider. Destroy it immediately.
        // Waiting until end of frame would leave two colliders on the walker.
        CapsuleCollider primitiveCollider = player.GetComponent<CapsuleCollider>();
        if (primitiveCollider != null)
        {
            Object.DestroyImmediate(primitiveCollider);
        }
        CharacterController controller = player.AddComponent<CharacterController>();
        controller.height = 2f;
        controller.radius = CourtyardLayout.PlayerRadius;
        controller.center = Vector3.zero;
        controller.stepOffset = 0.3f;
        Paint(player, new Color(0.1f, 0.42f, 0.44f));
        return player.AddComponent<Walker>();
    }

    static void AttachCamera(Transform target)
    {
        Camera camera = Camera.main;
        if (camera == null)
        {
            GameObject cameraObject = new GameObject("Main Camera");
            cameraObject.tag = "MainCamera";
            camera = cameraObject.AddComponent<Camera>();
            cameraObject.AddComponent<AudioListener>();
        }

        camera.clearFlags = CameraClearFlags.SolidColor;
        camera.backgroundColor = new Color(0.62f, 0.74f, 0.82f);
        FollowCamera follow = camera.GetComponent<FollowCamera>();
        if (follow == null)
        {
            follow = camera.gameObject.AddComponent<FollowCamera>();
        }

        follow.target = target;
        camera.transform.position = target.position + follow.offset;
        camera.transform.LookAt(target.position + Vector3.up * 1.2f);
    }

    static void TuneLight()
    {
        Light sun = Object.FindAnyObjectByType<Light>();
        if (sun == null)
        {
            GameObject lightObject = new GameObject("Directional Light");
            sun = lightObject.AddComponent<Light>();
            sun.type = LightType.Directional;
            lightObject.transform.rotation = Quaternion.Euler(50f, -30f, 0f);
        }

        sun.color = new Color(1f, 0.95f, 0.84f);
        sun.intensity = 1.15f;
        sun.shadows = LightShadows.Soft;
    }

    static void Paint(GameObject target, Color color)
    {
        Renderer renderer = target.GetComponent<Renderer>();
        if (renderer == null)
        {
            return;
        }

        Material material = renderer.material;
        if (material.HasProperty("_Color"))
        {
            material.color = color;
        }

        if (material.HasProperty("_BaseColor"))
        {
            material.SetColor("_BaseColor", color);
        }
    }

}
