import { useTranslation } from "@/useTranslation";

// Custom hook to get translated links
const useGetLinks = (road) => {
  const { t } = useTranslation();

  // Function to retrieve translated links
  const getLinks = () => {
    // Get translations for the specified road using the t function from useTranslation
    const translations = t(road, { returnObjects: true });
    return translations;
  };

  // Call the getLinks function and return the result
  return getLinks();
};

export default useGetLinks;
