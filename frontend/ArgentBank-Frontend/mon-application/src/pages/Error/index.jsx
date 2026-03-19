import { Link } from "react-router-dom"
import ImgError from "../../assets/page_not_found.svg"

function Error() {
  return (
    <main class="main main-center">
      <div className="error-content">
        <img src={ImgError} alt="error" className="error-content__img" />
        <h2 className="error-content__subtitle">
          Oups! La page que vous demandez n'existe pas.
        </h2>
        <Link to="/" className="error-content__link">
          Retourner sur la page d'accueil
        </Link>
      </div>
    </main>
  )
}

export default Error
