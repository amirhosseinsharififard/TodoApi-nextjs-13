import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState("abas");
  const [password, setPassword] = useState("abas");
  const router = useRouter();

  const {status} = useSession();
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);
  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: "/",
    });

    if (res?.error) {
      console.error("Login failed", res.error);
      // نمایش پیام خطا در صورت نیاز
      return;
    }

    router.push("/"); // ورود موفقیت‌آمیز، ریدایرکت به صفحه اصلی
  };

  return (
    <div className='signin-form'>
      <h3>Login Form</h3>
      {/* استفاده از فرم برای ارسال درخواست */}
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

      <button onClick={loginHandler}>Login</button>
      <div>
        <p>Create an account?</p>
        <Link href='/signup'>Sign up</Link>
      </div>
    </div>
  );
};

export default SignIn;
