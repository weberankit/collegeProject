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
  
  const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);

  }).catch((error) => {
   
    const errorMessage = error.message;
  
    setErrorMsg(errorMessage)
  });

}



    return (
      <>
        <Navbar data={userData}/>
        {userData ? (
          <div style={{ textAlign: "center", height: "300px", paddingTop: "3em" }}>
            <div style={{ fontSize: "16px" }}>
              <p style={{ padding: ".5em" }}> Hi {userData?.displayName}</p> 
              <p>{userData?.email}</p> 
            </div>
            <button style={{ marginTop: "1em", padding: "0.5em 1em", backgroundColor: "blue", color: "white", borderRadius: "5px", border: "none", cursor: "pointer" }} onClick={() => handlesignout()}>LogOut</button>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} style={{ backgroundColor: "rgba(0,0,0,0.8)", borderRadius: "10px", textAlign: "center", padding: "20px" }}>
            <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
            {!isLogin && <input ref={fullName} type="text" style={{ padding: "10px", marginBottom: "10px", width: "100%", backgroundColor: "orange", borderRadius: "5px", border: "none" }} placeholder="Full Name"/>}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input ref={email} type="text" style={{ padding: "10px", marginBottom: "10px", width: "48%", marginRight: "2%", backgroundColor: "orange", borderRadius: "5px", border: "none" }} placeholder="Email Address"/>
              <input ref={password} type="password" style={{ padding: "10px", marginBottom: "10px", width: "48%", backgroundColor: "orange", borderRadius: "5px", border: "none" }} placeholder="Password (@Weber12)"/>
            </div>
            <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>
            <button style={{ padding: "10px", marginTop: "10px",marginBottom:"9px", width: "100%", backgroundColor: "orange", borderRadius: "5px", border: "none", cursor: "pointer" }} onClick={handleCheckvalidate}>{isLogin ? "Sign In" : "Sign Up"}</button>
            <p style={{ cursor: "pointer",backgroundColor:"white",padding:"10px" }} onClick={toggleSign}>{isLogin ? "New to MyShop ? Sign Up now" : "Already user ? Sign In Now"}</p>
            <p style={{ color: "black", backgroundColor: "red", margin: "10px", fontWeight: "bold", padding: "10px", cursor: "pointer" }} onClick={() => loginWithGoogle(auth)}>signIn with google</p>
          </form>
        )}
        <Footer />
      </>
    );
    
}
export default Login