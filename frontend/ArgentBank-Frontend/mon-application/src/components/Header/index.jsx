import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import Logo from "../../assets/argentBankLogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { useSelector, useDispatch } from "react-redux"
import { userSelector, signOut } from "../../features/auth"

function Header() {
  const { firstName, token } = useSelector(userSelector)

  const dispatch = useDispatch()

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {!token ? (
          <Link to="/signin" className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} />
            &nbsp;Sign In
          </Link>
        ) : (
          <>
            <Link to="/profile" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              &nbsp;{firstName}
            </Link>
            <Link
              to="/"
              className="main-nav-item"
              onClick={() => dispatch(signOut())}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              &nbsp;Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header
