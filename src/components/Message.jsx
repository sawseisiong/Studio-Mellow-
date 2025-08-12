import { useEffect } from "react";

function Message({ message, setMessage }) {
  useEffect(() => {
    if (!message.message) return;
    const id = setTimeout(() => {
      setMessage({});
    }, 3000);
    return () => clearTimeout(id);
  }, [message.message]);

  return (
    <>
      {message.message && (
        <div
          className="toast-container position-fixed"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          style={{ top: "15px", right: "15px" }}
        >
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-delay="3000"
          >
            <div
              className={`toast-header text-white `}
              style={{ backgroundColor: "#e26d5a" }}
            >
              <strong className="me-auto">Message</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
            <div className="toast-body">{message.message}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
