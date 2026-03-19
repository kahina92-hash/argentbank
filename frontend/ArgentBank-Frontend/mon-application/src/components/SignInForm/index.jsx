// src/components/SignInForm.jsx
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userSelector, login } from "../../features/auth"
import Loader from "../Loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"

function SignInForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, mail, authenticationStatus, errorMsg, isLoading } = useSelector(userSelector)

  const [email, setEmail] = useState(mail || "")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  // Redirection si connecté
  useEffect(() => {
    if (authenticationStatus === "success" || token) {
      navigate(`/profile`)
    }
  }, [authenticationStatus, token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password, rememberMe }))
    setEmail("")
    setPassword("")
  }

  if (isLoading) return <Loader />

  return (
    <section className="sign-in-content" style={{ maxWidth: 400, margin: "auto", padding: "2rem", textAlign: "center" }}>
      <FontAwesomeIcon className="sign-in-icon" icon={faUserCircle} style={{ fontSize: "3rem", marginBottom: "1rem" }} />

      {errorMsg && (
        <p style={{ color: "red", fontWeight: "bold" }} aria-live="assertive">
          {errorMsg}
        </p>
      )}

      <h1 className="sign-in-title">Sign In</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper" style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div className="input-wrapper" style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div className="input-remember" style={{ marginBottom: "1rem" }}>
          <input
            type="checkbox"
            id="remember-me"
            name="remember-me"
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me" style={{ marginLeft: "0.5rem" }}>Remember me</label>
        </div>

        <button type="submit" className="sign-in-button" style={{ padding: "0.5rem 1rem" }}>
          Sign In
        </button>
      </form>
    </section>
  )
}

export default SignInForm
