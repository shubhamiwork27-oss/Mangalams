"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./accounts.css";
import AppleLogo from "../../app/assets/icons/applelogo.webp";
import GoogleLogo from "../../app/assets/icons/googlelogo.png";

const Accounts = () => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const isSignup = mode === "signup";

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignup && form.name.trim().length < 2) {
      setMessage({
        type: "error",
        text: "Please enter your full name.",
      });
      return;
    }

    if (!form.email.includes("@")) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (form.password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    const savedAccount = JSON.parse(
      localStorage.getItem("mangalams-account") || "null",
    );

    if (isSignup) {
      localStorage.setItem(
        "mangalams-account",
        JSON.stringify({
          name: form.name.trim(),
          email: form.email,
          password: form.password,
        }),
      );

      setMessage({
        type: "success",
        text: "Your Mangalams account is ready. Welcome to the circle.",
      });

      setMode("login");

      setForm({
        name: "",
        email: form.email,
        password: "",
      });

      return;
    }

    if (
      !savedAccount ||
      savedAccount.email !== form.email ||
      savedAccount.password !== form.password
    ) {
      setMessage({
        type: "error",
        text: "We couldn't match those details. Please check and try again.",
      });

      return;
    }

    setMessage({
      type: "success",
      text: `Welcome back, ${savedAccount.name.split(" ")[0]} 🌿`,
    });
  };

  return (
    <main className={`mangalams-account ${isSignup ? "is-signup" : "is-login"}`}>
      <Link className='home-link' href='/' aria-label='Go to home page'>
        <span>Go to home</span>
      </Link>

      {/* Left Story Section */}
      <section className='account-story'>
        <div className='story-overlay'></div>

        <div className='story-content'>
          <p className='brand-mark'>MANGALAMS</p>

          <span className='story-label'>WEAR • REUSE • RENEW</span>

          <h1>
            Clothes carry
            <br />
            <em>stories.</em>
          </h1>

          <p className='story-description'>
            From wedding celebrations to everyday moments, Mangalams gives
            meaningful clothing another chapter.
          </p>

          <div className='story-points'>
            <div className='story-point'>
              <span>01</span>
              <p>Discover conscious fashion</p>
            </div>

            <div className='story-point'>
              <span>02</span>
              <p>Give loved clothes a new life</p>
            </div>

            <div className='story-point'>
              <span>03</span>
              <p>Keep stories moving forward</p>
            </div>
          </div>
        </div>

        <div className='story-bottom'>
          <span>FOR PEOPLE</span>
          <span>FOR CLOTHES</span>
          <span>FOR TOMORROW</span>
        </div>
      </section>

      {/* Account Section */}
      <section className='account-panel'>
        <div className='account-container'>
          <div className='mobile-brand'>
            <p>MANGALAMS</p>
          </div>

          <div className='account-header' key={`header-${mode}`}>
            <h2>
              {isSignup
                ? "Give every piece another beginning."
                : "Good to see you again."}
            </h2>

            <p>
              {isSignup
                ? "Create your account and start your journey with more meaningful fashion."
                : "Continue discovering clothing with a story behind it."}
            </p>
          </div>

          {/* Tabs */}
          <div className='account-tabs'>
            <button
              type='button'
              suppressHydrationWarning
              className={!isSignup ? "active" : ""}
              onClick={() => {
                setMode("login");
                setMessage({
                  type: "",
                  text: "",
                });
              }}>
              Log in
            </button>

            <button
              type='button'
              suppressHydrationWarning
              className={isSignup ? "active" : ""}
              onClick={() => {
                setMode("signup");
                setMessage({
                  type: "",
                  text: "",
                });
              }}>
              Sign up
            </button>

          </div>

          {/* Form */}
          <form
            className='account-form'
            key={`form-${mode}`}
            onSubmit={handleSubmit}>
            {isSignup && (
              <div className='form-field'>
                <label htmlFor='name'>Full name</label>

                <input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Your full name'
                  value={form.name}
                  onChange={handleChange}
                  autoComplete='name'
                />
              </div>
            )}

            <div className='form-field'>
              <label htmlFor='email'>Email address</label>

              <input
                id='email'
                name='email'
                type='email'
                placeholder='you@example.com'
                value={form.email}
                onChange={handleChange}
                autoComplete='email'
              />
            </div>

            <div className='form-field'>
              <label htmlFor='password'>Password</label>

              <div className='password-wrapper'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='At least 6 characters'
                  value={form.password}
                  onChange={handleChange}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />

                <button
                  type='button'
                  suppressHydrationWarning
                  className='password-toggle'
                  onClick={() => setShowPassword((visible) => !visible)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {!isSignup && (
              <button
                type='button'
                suppressHydrationWarning
                className='forgot-password'>
                Forgot password?
              </button>
            )}

            <div className='account-actions'>
              <button
                type='submit'
                suppressHydrationWarning
                className='account-submit'>
                <span>{isSignup ? "Create my account" : "Continue"}</span>

                <span className='submit-arrow'>↗</span>
              </button>

              <button
                type='button'
                suppressHydrationWarning
                className='social-action'
                aria-label='Continue with Google'>
                <Image src={GoogleLogo} alt='' width={20} height={20} />
              </button>

              <button
                type='button'
                suppressHydrationWarning
                className='social-action'
                aria-label='Continue with Apple'>
                <Image src={AppleLogo} alt='' width={20} height={20} />
              </button>
            </div>

          </form>

          {/* Message */}
          {message.text && (
            <div className={`account-message ${message.type}`} role='status'>
              {message.text}
            </div>
          )}

          {/* Bottom Switch */}
          <div className='account-switch'>
            <span>
              {isSignup ? "Already part of Mangalams?" : "New to Mangalams?"}
            </span>

            <button
              type='button'
              suppressHydrationWarning
              onClick={() => {
                setMode(isSignup ? "login" : "signup");

                setMessage({
                  type: "",
                  text: "",
                });
              }}>
              {isSignup ? "Log in" : "Create account"}
            </button>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Accounts;
