using UnityEngine;

public class NewMonoBehaviourScript : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetAxis("Horizontal")>-2)
        {
            transform.position = transform.position + new Vector3(Input.GetAxis("Horizontal") * Time.deltaTime, 0, 0);

        }
        
        if(Input.GetAxis("Vertical")>-2)
        {
            transform.position = transform.position + new Vector3(0,0,Input.GetAxis("Vertical") * Time.deltaTime);

        }
    }
}
