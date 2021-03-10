import { useState } from "react"
import M from 'materialize-css'

import Loader from "./loader"

const ViewMsg = () =>{

    const [msg,setMsg] = useState('')
    const [password,setPassword] = useState('') 

    const [showLoader,setShowLoader] = useState(false)
    const [disable,setDisable] = useState(false)
    const [showMsg,setShowMsg] = useState(false)


    const getMsg = async (e) =>{
        try {
            e.preventDefault()
            M.Toast.dismissAll()
            const urlParams = new URLSearchParams(window.location.search)
            const rs = urlParams.get('rs')
            setShowLoader(true)
            setDisable(true)
            const res = await fetch(`https://secret-message-backend.herokuapp.com/message-by-id/${rs}/${password}`)
            const resData = await res.json()
            setShowLoader(false)
            setDisable(false)
            if(res.status===200){
                setMsg(resData.message)
                setPassword('')
                setShowMsg(true)
            }
            else if(res.status===401){
                M.toast({html: 'Invalid password!', classes:'error', displayLength: 10000})
            }
            else if(res.status===400){
                M.toast({html: 'Link expired or message deleted', classes:'error', displayLength: 10000})
            }
        } 
        catch(err){
            setShowLoader(false)
            setDisable(false)
            M.toast({html: "Connection timeout!", classes:'error', displayLength: 10000})
        }
    }

    return(
        <div className='view-msg'>
            <div className='msg-con'>
                {showLoader && <Loader/>}
                <h5 className="mb-4"> Secret Message </h5>
                {
                    !showMsg &&
                    <form className="mb-5" onSubmit={e=>getMsg(e)}>
                        <div className="form-row mb-2">
                            <div className="col input-field">
                                <input type="password" id="password" required disabled={disable}
                                    value={password} onChange={e=>setPassword(e.target.value)} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="view-msg-btns">
                            <button className="btn" type="submit" disabled={disable}> Get Message
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                }
                { 
                    showMsg &&
                    <>
                     <p className='mt-3 #ffff00 yellow accent-2 secret-msg'> {msg} </p>
                    </>
                }
            </div>
        </div>
    )
}

export default ViewMsg