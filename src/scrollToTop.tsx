import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // window.scrol(0,0);
    let p = document.getElementById('mainContainer')
    if (p) {
      p.scrollTop=0;
    }
  }, [pathname]);

  return null;
}
