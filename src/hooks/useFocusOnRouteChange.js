import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function useFocusOnRouteChange() {
  const headingRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [location.pathname]);
  return headingRef;
}

export default useFocusOnRouteChange;
