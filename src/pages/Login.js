//import Header from "./Header"
import {useState , useRef,useEffect} from "react" 
import { checkvalidate } from "../utils/validate"
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword , updateProfile , signOut} from "firebase/auth";
import {auth} from "../utils/firebase"
//import { useDispatch } from "react-redux";
//import { addUser } from "../utils/userSlice";
//import { useNavigate } from "react-router-dom";
//import { userImg } from "../constant";
//import { backgroundImg } from "../constant";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {  signInWithPopup, GoogleAuthProvider ,onAuthStateChanged } from "firebase/auth";
//import { loginSkip } from "../utils/configSlice";
//import { showHome } from "../utils/configSlice";
import { Footer, Navbar } from "../components";
import "../index.css"
const Login=()=>{
 // const dispatch = useDispatch()

//const errorMsg=useRef("ok")  //not using this as its not reflect update in ui because it doesnot rerender
const [errorMsg, setErrorMsg]=useState()
const email=useRef(null)
const password=useRef(null)
const fullName=useRef(null)
const [isLogin , setisLogin]=useState(true)
const [userData, setUserData]=useState(null)
//const navigate=useNavigate()
const toggleSign=()=>{
setisLogin(!isLogin)
}
const handleCheckvalidate=()=>{
 
    //handele error / validation of form
const message =checkvalidate(email.current.value , password.current.value)
//using usref to store value
//errorMsg.current=message
setErrorMsg(message)
//if message is null i.e falsy value so if it is true then return nothing i.e not do further task
if(message)return
//authentication
if(!isLogin){
  setErrorMsg("signin started")

//sign up
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
   //navigate("/browse")

//to display name of user
   updateProfile(user, {
    displayName: fullName.current.value, photoURL: ""
  }).then(() => {
    // Profile updated!
    // navigate("/browse")
///since redux not wait to updating value so we are dispatch here as to make it update
const {uid ,email,displayName,photoURL} = auth.currentUser;
//dispatch(addUser( {uid:uid ,email:email,displayName:displayName , photoURL:photoURL}))
setUserData({uid:uid ,email:email,displayName:displayName , photoURL:photoURL})
setErrorMsg(null)

  }).catch((error) => {
    // An error occurred
    // ...
    setErrorMsg(error.message)
  });



  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode + " - " + errorMessage)
});


}else{
//sign in
signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {

    // Signed in 
    //const user = userCredential.user;
   // console.log(user)
 //navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode + " - " + errorMessage)
  });
}

}

useEffect(()=>{
  //user sign in/out mange b this
const subscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      //sign in
      const {uid ,email,displayName,photoURL} = user;
     // dispatch(addUser( {uid:uid ,email:email,displayName:displayName,photoURL:photoURL}))
  //   navigate("/browse")
      setUserData({uid:uid ,email:email,displayName:displayName,photoURL:photoURL})
    } else {
      // User is signed out
      // ...
      // dispatch(removeUser())
       //navigate("/")
    }
  });

return ()=>subscribe()

},[])

const handlesignout=()=>{
  //when user click on sign out btn this api   will call onauthstatechange else part and code inside it
signOut(auth).then(() => {
// Sign-out successful.
//  navigate("/")
}).catch((error) => {
// An error happened.
});
setUserData(null)
}



function loginWithGoogle(auth){
  setErrorMsg("signin startd")
  const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    setErrorMsg(null)

  }).catch((error) => {
   
    const errorMessage = error.message;
  
    setErrorMsg(errorMessage)
  });

}



    return (
      <>
        <Navbar data={userData}/>
        <div className="mt-5">
        {userData ? (
  <div className="flex flex-col items-center justify-center h-72 pt-12 text-center">
    <div className="text-lg">
      <p className="py-2">Hi {userData?.displayName}</p>
      <p>{userData?.email}</p>
    </div>
    <button 
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={() => handlesignout()}
    >
      LogOut
    </button>
  </div>
): (
  <form onSubmit={(e) => e.preventDefault()} className="bg-gray-300 shadow-lg bg-opacity-80 rounded-lg text-center p-5 w-1/2 m-auto">
  <h1 className="text-2xl font-semibold mb-4">{isLogin ? "Sign In" : "Sign Up"}</h1>
  {!isLogin && (
   <div className= " w-1/2 m-auto"> <input 
      ref={fullName} 
      type="text" 
      className="p-2  rounded border-none mt-2" 
      placeholder="Full Name" 
    /></div>
  )}
  <div className="flex flex-col justify-between mb-3 w-1/2 m-auto">
    <input 
      ref={email} 
      type="text" 
      className="p-2  rounded border-none mt-2" 
      placeholder="Email Address" 
   
    />
    <input 
      ref={password} 
      type="password" 
      className="p-2 wrounded border-none mt-2 " 
      placeholder="Password (@Weber12)" 
      
    />
  </div>
  <p className=" text-red-500 font-bold mb-3 ">{errorMsg}</p>
  <button 
    className="p-2  bg-black w-1/2 text-white rounded cursor-pointer mb-3" 
    onClick={handleCheckvalidate}
  >
    {isLogin ? "Sign In" : "Sign Up"}
  </button>
  <p 
    className="cursor-pointer bg-gray-400 text-black p-2 mb-3 w-1/2 m-auto rounded-md" 
    onClick={toggleSign}
  >
    {isLogin ? "New to MyShop? Sign Up now" : "Already a user? Sign In Now"}
  </p>
  <p 
    className="hidden cursor-pointer text-white bg-black w-1/2 m-auto rounded-md p-2 font-bold" 
    onClick={() => loginWithGoogle(auth)}
  >
    Sign In with Google
  </p>
</form>

  
        )}
        </div>
        <Footer />
      </>
    );
    
}
export default Login