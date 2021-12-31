import React,{Component} from "react";
import "./landing.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default class Landing extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      password:"",
      userInfo: {
        username: "",
        password:""
      },
    };
    this.checkuser();
  }
  changeValue(name,evt){
    let state=this.state;
    state[name]=evt.target.value;
    this.setState(state);
  }
  checkuser(){
    if(localStorage.getItem("token")){
      this.props.history.push("/home");

    }
  }
  signinclicked(){
    const container = document.getElementById('container');
    container.classList.add("right-panel-active");
  }
  signupclicked(){
    const container = document.getElementById('container');
    container.classList.remove("right-panel-active");
  }
  async login(){
    let data={
      username:this.state.username,
      password:this.state.password
    }
    await axios.post('https://gamebackend-black.vercel.app/api/auth/login',data)
        .then((res) => {
          toast(res.message);
        })
        .catch((err) => {
            toast.error(err.message);
        })
  }
  async signup(){
    let data={
      username:this.state.username,
      password:this.state.password
    }
    await axios.post('https://gamebackend-black.vercel.app/api/auth/signup',data)
        .then((res) => {
          toast(res.message);
        })
        .catch((err) => {
          toast.error(err.message);
        })
  }
  render(){
    return(
      <div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <div class="container" id="container">
	<div class="form-container sign-up-container">
		<form >
			<h1>Create Account</h1>
			<input value={this.state.username} onChange={(e)=>{this.changeValue("username",e)}} placeholder="Username" />
			<input value={this.state.password} onChange={(e)=>{this.changeValue("password",e)}} type="password" placeholder="Password" />
			<button onClick={()=>this.signup()}>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form >
			<h1>Sign in</h1>
			<input value={this.state.username} onChange={(e)=>{this.changeValue("username",e)}} placeholder="Username" />
			<input value={this.state.password} onChange={(e)=>{this.changeValue("password",e)}} type="password" placeholder="Password" />
			<button onClick={()=>this.login()}>Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" onClick={()=>{this.signupclicked()}} id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" onClick={()=>{this.signinclicked()}} id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>

<footer>
	<p>
		Created with <i class="fa fa-heart"></i> by Kishore
	</p>
</footer>
      </div>
    );
  }
}
