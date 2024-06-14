import { useState } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

import Footer from "../../Components/Footer/Footer";
import { postData } from "../../Utils/Query";

import eventbrite from "./../../assets/icons/eventbrite-dark.svg";
import boxd from "./../../assets/icons/box-dark.svg";
import volkswagen from "./../../assets/icons/volkswagen-dark.svg";
import netapp from "./../../assets/icons/netapp-dark.svg";
import nasdaq from "./../../assets/icons/nasdaq-dark.svg";

function Login() {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const signIn = useSignIn();
	const isAuthenticated = useIsAuthenticated();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		if (email && password) {
			const body = { email, password };
			setLoading(true);

			try {
				const response = await postData("/api/login", body);
				const data = await response.json();

				if (
					signIn({
						token: data.token,
						tokenType: "Bearer",
						expiresIn: 3600,
						authState: {
							userName: data.userName,
							email: data.email,
							userId: data.id,
						},
					})
				) {
					navigate("/");
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		} else {
			alert("Please enter both email and password");
		}
	};

	if (isAuthenticated) {
		navigate("/");
	}

	return (
		<>
			<div className='flex items-center justify-center py-12'>
				<div className='flex flex-col gap-3 w-full px-6 sm:px-0 xsm:w-auto'>
					<div className='flex flex-col gap-2'>
						<h2 className='font-[700] text-md'>Log in to your Udemy account</h2>
						<form onSubmit={handleLogin}>
							<div className='flex flex-col gap-1 border border-black px-3 py-2'>
								<label htmlFor="email" className='font-bold text-sm'>Email</label>
								<input
									id="email"
									type='email'
									name='email'
									required
									className='w-full outline-none'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='flex flex-col gap-1 border border-black px-3 py-2 mt-4'>
								<label htmlFor="password" className='font-bold text-sm'>Password</label>
								<input
									id="password"
									type='password'
									name='password'
									required
									className='w-full outline-none'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button
								type='submit'
								className='w-full bg-[#a435f0] py-3 mt-4 font-bold text-white font-sm'
								disabled={loading}
							>
								{loading ? "Loading..." : "Log in"}
							</button>
						</form>
					</div>
					<div className='flex flex-col gap-2 items-center'>
						<p className='text-sm'>
							or{" "}
							<HashLink className='text-[1rem] text-[#8243d0] font-bold'>
								Forgot Password
							</HashLink>
						</p>
						<hr className='w-full' />
						<p className='text-sm'>
							Don't have an account?{" "}
							<HashLink to="/signup" className='text-[1rem] text-[#8243d0] font-bold'>
								Sign up
							</HashLink>
						</p>
						<HashLink className='text-sm text-[#8243d0] font-bold'>
							Log in with your organization
						</HashLink>
					</div>
				</div>
			</div>

			{/* FOOTER  */}
			<div className='flex flex-col gap-4 md:flex-row justify-between px-7 py-7 border-b border-slate-500 bg-[#1c1d1f]'>
				<p className='text-xl font-bold text-white'>
					Top companies choose{" "}
					<HashLink className='text-purple-300 hover:underline'>
						Udemy Business
					</HashLink>{" "}
					to build in-demand career skills.
				</p>
				<div className='flex flex-1 items-start justify-evenly sm:justify-between flex-wrap'>
					<img src={nasdaq} alt='Nasdaq' />
					<img src={volkswagen} alt='Volkswagen' />
					<img src={boxd} alt='Box' />
					<img src={netapp} alt='NetApp' />
					<img src={eventbrite} alt='Eventbrite' />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Login;
