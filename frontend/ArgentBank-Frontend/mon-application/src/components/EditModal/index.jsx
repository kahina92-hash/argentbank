import Modal from "react-modal"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userSelector, updateProfile } from "../../features/auth"
import * as userActions from "../../features/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle, faXmark } from "@fortawesome/free-solid-svg-icons"
import Loader from "../Loader"
import PropTypes from "prop-types"

function EditModal({ isOpen, onRequestClose }) {
  // used to set the focus on error when an error occure for screen Reader (accessibility)
  const errRef = useRef()

  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { token, errorMsg, isLoading } = useSelector(userSelector)

  // Empty out any error message if the user change the user state or password state - the error disappear because the user already read it
  useEffect(() => {
    const clearError = () => {
      dispatch(userActions.clearErrorMsg())
    }

    // Empty out any error message if the user changes the email or password and if errorMsg is not an empty string
    if ((firstName || lastName) && errorMsg !== "") {
      clearError()
    }

    // Set the focus on the error message if errorMsg is not an empty string (Accessibility)
if (errorMsg !== "" && errRef.current) {
  errRef.current.focus()
}


    // Cleanup function to cancel the effect when the component is unmounted (memory licking)
    return () => {
      if (errorMsg !== "") {
        clearError()
      }
    }
  }, [firstName, lastName, errorMsg, dispatch])

  // Function handling from submission
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateProfile({ firstname: firstName, lastname: lastName, token: token })
    )
    setFirstName("")
    setLastName("")
    setIsSubmitted(true)
  }

  // Effect to close the modal when isSubmitted is true
  useEffect(() => {
    if (isSubmitted && errorMsg === "") {
      onRequestClose()
    }
  }, [isSubmitted, errorMsg, onRequestClose])

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false)
    }
  }, [isOpen])

  if (isLoading) {
    return <Loader />
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isSubmitted ? onRequestClose : null} // Fermer la modal si isSubmitted est true
      contentLabel="Edit Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <section className="edit-name-content">
        <FontAwesomeIcon className="edit-name-icon" icon={faUserCircle} />
        <p
          ref={errRef}
          className={errorMsg ? "errmsg" : "hidden"}
          aria-live="assertive"
        >
          {errorMsg}
        </p>
        <h1 className="edit-name-title">Edit Name</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="firstName">Firstname</label>
            <input
              type="text"
              id="firstName"
              autoFocus
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="New firstname"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="New lastname"
              required
            />
          </div>
          <button className="edit-confirmation-button">Ok</button>
          <FontAwesomeIcon
            icon={faXmark}
            className="edit-close-button"
            onClick={onRequestClose}
            aria-label="Close"
          />
        </form>
      </section>
    </Modal>
  )
}

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default EditModal
