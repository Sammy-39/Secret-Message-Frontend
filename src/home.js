import { useState } from "react"
import { useHistory } from "react-router"

import Loader from './loader'

const Home = () =>{

    const [key,setKey] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [message,setMessage] = useState("")
    const [showSuccess,setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [err,setError] = useState('')
    const [disable,setDisable] = useState(false)
    const [showLoader,setShowLoader] = useState(false)

    const history = useHistory()

    const handleSend = async (e) =>{
        e.preventDefault()
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
                setShowSuccess(true)
                setPassword('')
                setKey('')
                setMessage('')
                setEmail('')
                setTimeout(()=>{
                    setShowSuccess(false)
                },2000)
            }
            if(res.status===422){
                setError('Secret key in use!')
                setShowError(true)
                setTimeout(()=>{
                    setShowError(false)
                },2000)
            }
        } 
        catch(err){
            setError('Error Sending Msg!')
            setShowError(true)
            setTimeout(()=>{
                setShowError(false)
            },2000)
        }
    }

    return(
        <div className='home'>
            <div className='home-form'>
                { showLoader && <Loader/> }
                <h4 className='mb-4'> Secret Message </h4>
                <form onSubmit={e=>handleSend(e)}>
                    <div className="form-row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Secret Key" required disabled={disable}
                            value={key} onChange={e=>setKey(e.target.value)} />
                        </div>
                        <div className="col">
                            <input type="password" className="form-control" placeholder="Password" required disabled={disable}
                            value={password} onChange={e=>setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <div className="col">
                            <input type="email" className="form-control" placeholder="Send to: Email" required disabled={disable}
                            value={email} onChange={e=>setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <div className="col">  
                            <textarea className="materialize-textarea"  placeholder="Message" required disabled={disable}
                            value={message} onChange={e=>setMessage(e.target.value)} />
                        </div>
                    </div>
                    <div className="send-btn">
                        { showSuccess && <p className="success"> Message Sent! </p>}
                        { showError && <p className="error"> {err} </p>}
                        <button type="submit" className="btn btn-success mr-3" disabled={disable}>Send</button>
                        <button type="button" className="btn btn-warning" onClick={()=>history.push('/')} disabled={disable}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home