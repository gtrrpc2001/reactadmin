import "./alarm.scss";

interface NotificationProps {
  message: string;
  onClose: () => void;
  position: { top: number; left: number };
}

export const BedAlarm: React.FC<NotificationProps> = ({
  message,
  onClose,
  position,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
  };
  return (
    <div
      className="notification"
      style={{ top: position.top + 40, left: position.left + 50 }}
      onClick={handleClick}
    >
      <div className="notification-content">
        <span className="notification-close" onClick={onClose}>
          &times;
        </span>
        <h2>알림</h2>
        <p>{message}</p>
        <button className="notification-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};
