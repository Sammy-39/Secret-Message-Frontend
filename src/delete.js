import { useState } from "react"
import { useHistory } from "react-router"

const Delete = () =>{

    const [key,setKey] = useState("")
    const [password,setPassword] = useState("")
    const [showSuccess,setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error,setError] = useState('Error deleting Msg!')

    const history = useHistory()

    const handleDelete = async (e) =>{
        e.preventDefault()
        try {
            const res = await fetch('https://secret-message-backend.herokuapp.com/delete-message',{
                method: 'DELETE',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                   password,
                   secretKey: key
                })
            })
            if(res.status===200){
                setShowSuccess(true)
                setPassword('')
                setKey('')
                setTimeout(()=>{
                    setShowSuccess(false)
                },2000)
            }
            else if(res.status===401){
                setShowError(true)
                setError('Incorrect Password!')
                setTimeout(()=>{
                    setShowError(false)
                },2000)
            }
            else if(res.status===404){
                setShowError(true)
                setError('Incorrect Secret Key!')
                setTimeout(()=>{
                    setShowError(false)
                },2000)
            }
        } 
        catch(err){
            setShowError(true)
            setTimeout(()=>{
                setShowError(false)
            },2000)
        }
    }

    return(
        <div className='delete'>
            <div className='delete-con'>
                <h4 className='mb-4'> Secret Message </h4>
                <form onSubmit={e=>handleDelete(e)}>
                    <div className="form-row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Secret Key" required
                            value={key} onChange={e=>setKey(e.target.value)} />
                        </div>
                        <div className="col">
                            <input type="password" className="form-control" placeholder="Password" required
                            value={password} onChange={e=>setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="send-btn">
                        { showSuccess && <p className="delete-success"> Message Deleted </p>}
                        { showError && <p className="delete-error"> {error} </p>}
                        <button type="submit" className="btn btn-danger mr-3">Delete</button>
                        <button type="button" className="btn btn-warning" onClick={()=>history.push('/')}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Delete