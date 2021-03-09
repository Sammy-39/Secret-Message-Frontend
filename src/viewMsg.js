import { useEffect, useState } from "react"
import { useParams } from "react-router"

const ViewMsg = () =>{

    const params = useParams()
    const [msg,setMsg] = useState('')

    const getMsg = async () =>{
        try {
            const res = await fetch(`https://secret-message-backend.herokuapp.com/message-by-id/${params.rs}`)
            const resData = await res.json()
            if(res.status===200){
                setMsg(resData.message)
            }
            else{
                setMsg("Message deleted!")
            }
        } 
        catch(err){
            setMsg("Unable to fetch message or message deleted!")
        }
    }

    useEffect(()=>{
        getMsg()
        // eslint-disable-next-line
    },[])

    return(
        <div className='view-msg'>
            <div className='msg-con'>
                <h5> Secret Message </h5>
                <p> {msg || 'Loading...'} </p>
            </div>
        </div>
    )
}

export default ViewMsg