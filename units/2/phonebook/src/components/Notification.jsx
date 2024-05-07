export default function Notification({ notification }) {
  if (notification == null) return null;

  return (
    <>
      <div className={`notification ${notification.type}`}>{notification.message}</div>
    </>
  );
}
