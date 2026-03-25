// import { useEffect, useState } from "react";

// export default function Toast({ message }) {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (message) {
//       setShow(true);
//       const t = setTimeout(() => setShow(false), 2800);
//       return () => clearTimeout(t);
//     }
//   }, [message]);

//   if (!show) return null;

//   return (
//     <div id="toast" className="on">
//       <span>{message}</span>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function Toast({ message }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(t);
    }
  }, [message]);

  return (
    <div className={`toast ${show ? "show" : ""}`}>
      {message}
    </div>
  );
}
