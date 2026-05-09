// AdBanner temporarily disabled — uncomment to re-enable

// import { useEffect, useRef, useState } from "react";
// import "../styles/adBanner.css";

// export default function AdBanner() {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           obs.disconnect();
//         }
//       },
//       { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={`ad-banner-wrap ${visible ? "ab-visible" : ""}`}
//     >
//       <img
//         src="/ad film banner.png"
//         alt="Ad Film — Editiv Agency"
//         className="ad-banner-img"
//       />
//     </div>
//   );
// }

export default function AdBanner() {
  return null;
}
