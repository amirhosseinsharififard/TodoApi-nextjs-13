import { useSession } from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signupHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: {"Content-Type": "application/json"},
    });
    const data = await res.json();
    console.log(data);

    if (data.status === "success") router.push("/signin");
    if (data.message === "User exsists already") router.push("/signin");
  };
   const {status} = useSession();
    useEffect(() => {
      if (status === "authenticated") router.replace("/");
    }, [status]);
  return (
    <div className='signin-form'>
      <h3>Registration Form</h3>
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signupHandler}>Register</button>
      <div>
        <p>Have an account?</p>
        <Link href='/signin'>Sign in</Link>
      </div>
    </div>
  );
};

export default Signup;
