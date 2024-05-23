import qr from "./img/qr.jpeg"
import { Link } from "react-router-dom"
const Payment=()=>{
    return(
        <>
        <div><Link to={"/"}><button className="text-white bg-black p-2 m-1 rounded-lg">Back to Home</button></Link></div>
        <div>
            <div className="mt-3 p-44 ">
                <div className="flex flex-row justify-center bg-gray-300 shadow-lg rounded-3xl">
                    <div><h1 className="text-2xl mr-2 font-serif font-extrabold">Pay by using Qr code</h1></div>
                    <div><img className="w-44 rounded-lg m-4" src={qr} alt="qr-image"></img></div>
                </div>
                <div className=" m-2 p-4 text-center"><h2>After payment please provide your Transaction-id</h2></div>
                <form className="text-center p-8"action="https://formsubmit.co/envoyfamily919955@gmail.com" method="POST" >
              <div className="flex flex-row justify-center ">
                <div className="m-1 mt-1"><input name="transaction-id" id="t-id" className="border border-black rounded-lg p-2" required type="text" placeholder="Transaction-id"></input></div>
                <input type="hidden" name="_next" value="https://myshopreact.vercel.app/OrdersConfirm.html"></input>
                <div className="m-1"> <button type="submit" className="bg-black p-2 rounded-lg text-white ">submit</button></div>
                </div>
                </form>
            </div>
        </div>
        
        
        
        
        </>
    )
}
export default Payment