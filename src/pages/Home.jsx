import { Navbar, Main, Product, Footer } from "../components";
import {onAuthStateChanged } from "firebase/auth";
import { useEffect ,useState } from "react";
import { auth } from "../utils/firebase";
function Home() {
const [datas,setData] = useState()
  useEffect(()=>{
    //user sign in/out mange b this
 const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //sign in
        const {uid ,email,displayName,photoURL} = user;
       // dispatch(addUser( {uid:uid ,email:email,displayName:displayName,photoURL:photoURL}))
    //   navigate("/browse")
        setData({uid:uid ,email:email,displayName:displayName,photoURL:photoURL})
      } else {
        // User is signed out
        // ...
        // dispatch(removeUser())
         //navigate("/")
      }
    });

return ()=>subscribe()

},[])


  return (
    <div className="text-white bg-gray-700" style={{backgroundColor:"gray"}}>
      <Navbar data={datas} />
      <Main />
      <Product />
      <Footer />
    </div>
  )
}

export default Home