import { useRef, useState } from "react"
import { useHistory } from "react-router"
import M from 'materialize-css'

import Loader from "./loader"

const Msg = () =>{

    const [key,setKey] = useState("")
    const [password,setPassword] = useState("")
    const [msg,setMsg] = useState("")

    const [disable,setDisable] = useState(false)
    const [showLoader,setShowLoader] = useState(false)
    const [showMsg,setShowMsg] = useState(false)
    const [edit,setEdit] = useState(false)

    const history = useHistory()
    const editMsgRef = useRef()

    const handleGetMsg = async (e) =>{
        if(e) { 
            e.preventDefault() 
            M.Toast.dismissAll()
        }
        try {
            setDisable(true)
            setShowLoader(true)
            const res = await fetch(`https://secret-message-backend.herokuapp.com/message-by-key/${key}/${password}`)
            const resData = await res.json()
            setDisable(false)
            setShowLoader(false)
            if(res.status===200){
                setMsg(resData.message)
                setShowMsg(true)
            }
            else if(res.status===401){
                M.toast({html: 'Incorrect Password!', classes:'error'})
            }
            else if(res.status===404){
                M.toast({html: 'Incorrect Secret Key!', classes:'error'})
            }
            else if(res.status===500){
                M.toast({html: 'Connection timeout!', classes:'error'})
            }
        } 
        catch(err){
            setShowLoader(false)
            setDisable(false)
            M.toast({html: 'Connection timeout!', classes:'error'})
        }
    }

    const handleEdit = async () =>{
        M.Toast.dismissAll()
        setMsg(editMsgRef.current?.value)
        try {
            setDisable(true)
            setShowLoader(true)
            const res = await fetch('https://secret-message-backend.herokuapp.com/edit-message',{
                method: 'PATCH',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                   password,
                   secretKey: key,
                   message: editMsgRef.current?.value
                })
            })
            setDisable(false)
            setShowLoader(false)
            if(res.status===200){
                M.toast({html: 'Message edited successfully!', classes:'success'})
                await handleGetMsg()
                setEdit(false)
            }
            else if(res.status===401){
                M.toast({html: 'Incorrect Password!', classes:'error'})
                handleGoBack()
            }
            else if(res.status===404){
                M.toast({html: 'Incorrect Secret Key!', classes:'error'})
                handleGoBack()
            }
            else if(res.status===500){
                M.toast({html: 'Connection timeout!', classes:'error'})
                handleGoBack()
            }
        } 
        catch(err){
            setShowLoader(false)
            setDisable(false)
            handleGoBack()
            M.toast({html: 'Error deleting Msg!', classes:'error'})
        }  
    }

    const handleDelete = async (e) =>{
        e.preventDefault()
        M.Toast.dismissAll()
        try {
            setDisable(true)
            setShowLoader(true)
            const res = await fetch('https://secret-message-backend.herokuapp.com/delete-message',{
                method: 'DELETE',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                   password,
                   secretKey: key
                })
            })
            setDisable(false)
            setShowLoader(false)
            if(res.status===200){
                setPassword('')
                setKey('')
                M.toast({html: 'Message Deleted!', classes:'success'})
            }
            else if(res.status===401){
                M.toast({html: 'Incorrect Password!', classes:'error'})
            }
            else if(res.status===404){
                M.toast({html: 'Incorrect Secret Key!', classes:'error'})
            }
            else if(res.status===500){
                M.toast({html: 'Connection timeout!', classes:'error'})
            }
            handleGoBack()
        } 
        catch(err){
            setShowLoader(false)
            setDisable(false)
            handleGoBack()
            M.toast({html: 'Error deleting Msg!', classes:'error'})
        }
    }

    const handleGoBack = () =>{
        setKey('')
        setPassword('')
        setShowMsg(false)
    }

    return(
        <div className='message'>
            <div className='message-con'>
                { showLoader && <Loader/> }
                <h4 className='mb-5 text-center'> Secret Message </h4>
                {
                    !showMsg &&
                    <form className='mb-3' onSubmit={e=>handleGetMsg(e)}>
                        <div className="form-row mb-3">
                            <div className="col input-field">
                                <input type="text" id="key" required disabled={disable}
                                value={key} onChange={e=>setKey(e.target.value)} />
                                <label htmlFor="key">Secret Key</label>
                            </div>
                            <div className="col input-field">
                                <input type="password" id="password" required disabled={disable}
                                value={password} onChange={e=>setPassword(e.target.value)} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="send-btn">
                            <button type="submit" className="btn btn-danger mr-3" disabled={disable}>View Message</button>
                            <button type="button" className="btn btn-warning" onClick={()=>history.push('/')} disabled={disable}>Back</button>
                        </div>
                    </form>
                }
                {
                    showMsg && 
                    <div className="message-options mb-5">
                        <i className="material-icons back-icon mr-2" onClick={handleGoBack}> keyboard_backspace</i> 
                        <div className="message-options-msg mr-1">
                            {!edit && <p onClick={()=>setEdit(true)}> {msg} </p> }
                            {
                                edit && 
                                <div className="col input-field">  
                                    <textarea className="materialize-textarea"  id="text-area" required disabled={disable}
                                    autoFocus onFocus={e=>e.target.select()} defaultValue={msg} ref={editMsgRef} />
                                    <label htmlFor="text-area">Message</label>
                                </div>
                            }
                        </div>
                        <div className="message-options-icons">
                            {!edit && <i className="material-icons delete-icon mr-2" onClick={()=>setEdit(true)}>create</i>}
                            {!edit && <i className="material-icons create-icon" onClick={handleDelete}>delete</i>}
                            {edit && <i className="material-icons check-icon mr-2" onClick={handleEdit}>check</i>}
                            {edit && <i className="material-icons cancel-icon" onClick={()=>setEdit(false)}>clear</i>}
                           
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Msg