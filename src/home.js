import { useState } from "react"
import { useHistory } from "react-router"
import M from 'materialize-css'

import Loader from './loader'

const Home = () =>{

    const [key,setKey] = useState(Math.random().toString(36).substr(2, 5))
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [message,setMessage] = useState("")
    const [disable,setDisable] = useState(false)
    const [showLoader,setShowLoader] = useState(false)

    const history = useHistory()

    const handleSend = async (e) =>{
        e.preventDefault()
        M.Toast.dismissAll()
        try {
            setDisable(true)
            setShowLoader(true)
            const res = await fetch('https://secret-message-backend.herokuapp.com/create-message',{
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    randomKey: key,
                    password,
                    targetMail: email,
                    message,
                    targetURL: 'https://secret-message-app.herokuapp.com/message'
                })
            })
            setDisable(false)
            setShowLoader(false)
            if(res.status===200){
                setPassword('')
                setKey(Math.random().toString(36).substr(2, 5))
                setMessage('')
                setEmail('')
                M.toast({html: 'Message Sent!', classes:'success'})
            }
            if(res.status===422){
                M.toast({html: 'Secret key in use!', classes:'error'})
            }
            if(res.status===500){
                M.toast({html: 'Connection timeout!', classes:'error'})
            }
        } 
        catch(err){
            setShowLoader(false)
            M.toast({html: 'Error Sending Msg!', classes:'error'})
        }
    }

    return(
        <div className='home'>
            <div className='home-form'>
                { showLoader && <Loader/> }
                <h4 className='mb-4 text-center'> Secret Message </h4>
                <form className='mb-4' onSubmit={e=>handleSend(e)}>
                    <div className="form-row">
                        <div className="col input-field">
                            <input type="text" id="key" required disabled={disable} autoFocus
                            value={key} onChange={e=>setKey(e.target.value)} />
                            <label htmlFor="key">Secret Key</label>
                        </div>
                        <div className="col input-field">
                            <input type="password" id="password" required disabled={disable}
                            value={password} onChange={e=>setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col input-field">
                            <input type="email" id="email" required disabled={disable}
                            value={email} onChange={e=>setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <div className="col input-field">  
                            <textarea className="materialize-textarea"  id="text-area" required disabled={disable}
                            value={message} onChange={e=>setMessage(e.target.value)} />
                            <label htmlFor="text-area">Message</label>
                        </div>
                    </div>
                    <div className="send-btn mb-3">
                        <button type="submit" className="btn mr-3" disabled={disable}>Send</button>
                        <button type="button" className="btn" onClick={()=>history.push('/')} disabled={disable}>Back</button>
                    </div>
                    <div className='form-info text-center blue-text'>
                        <p> Remember the key and password for further use. </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home