import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userSelector, loadProfile } from "../../features/auth"
import { useNavigate } from "react-router-dom"
import AccountSection from "../../components/AccountSection"
import EditModal from "../../components/EditModal/index"

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    closeModal() // Make sure to close the modal before opening it again
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const { token, firstName, lastName } = useSelector(userSelector)

  useEffect(() => {
    if (token) {
      dispatch(loadProfile({ token }))
    } else {
      navigate(`/signin`)
    }
  }, [token, dispatch, navigate])

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName} {lastName}
        </h1>
        <button className="edit-button" onClick={openModal}>
          Edit Name
        </button>
        <EditModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>
      <h2 className="sr-only">Accounts</h2>

      <AccountSection />
    </main>
  )
}

export default Profile
