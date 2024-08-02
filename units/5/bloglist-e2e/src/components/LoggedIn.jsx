import PropTypes from 'prop-types'

LoggedIn.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

function LoggedIn({ user, handleLogout }) {
  return (
    <>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </>
  )
}

export default LoggedIn
