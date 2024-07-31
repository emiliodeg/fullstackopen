import PropTypes from 'prop-types'

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
}

export default function ErrorMessage({ notification }) {
  if (!notification) return null

  return (
    <>
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    </>
  )
}
