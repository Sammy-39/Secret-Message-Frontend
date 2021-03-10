import { useHistory } from "react-router"

const Landing = () =>{
    const history = useHistory()
    return(
        <div className='landing'>
            <div className='landing-con'>
                <h4 className='mb-5'> Secret Message App </h4>
                <div className='landing-btn mb-5'>
                    <button type="button" className="btn btn-primary mr-3" onClick={()=>history.push('/home')}>Send Message</button>
                    <button type="button" className="btn btn-danger" onClick={()=>history.push('/delete')}>Delete Message</button>
                </div>
            </div>
        </div>
    )
}

export default Landing