import { useEffect } from "react";

export function useSEO({ title, description }) {
  useEffect(() => {
    // Update the document title
    if (title) {
      document.title = `${title} | Almeida Photography`;
      
      // Also update OG and Twitter title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", `${title} | Almeida Photography`);
      
      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute("content", `${title} | Almeida Photography`);
    }

    // Update the meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
      
      // Also update OG and Twitter description
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
      
      const twitterDesc = document.querySelector('meta[property="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute("content", description);
    }
  }, [title, description]);
}
