import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "@/useTranslation";

// Component responsible for rendering the language selector dropdown
function LanguageSelector({ className }) {
  const { i18n } = useTranslation();
  const router = useRouter();

  const [activeDrop, setActiveDrop] = useState(false);
  const langDropRef = useRef(null);

  useEffect(() => {
    // Check if a language is stored in local storage
    const storedLanguage = window.localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      // Change the language using the i18n changeLanguage function
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    let langDropHandler = (e) => {
      // Close the dropdown if a click occurs outside the dropdown
      if (!langDropRef.current.contains(e.target) && activeDrop) {
        setActiveDrop(false);
      }
    };

    // Add event listener for click events
    document.addEventListener("click", langDropHandler);

    return () => {
      // Remove event listener when the component is unmounted
      document.removeEventListener("click", langDropHandler);
    };
  });

  const handleLanguageChange = (language) => {
    // Change the language if the selected language is different from the current language
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
      // Store the selected language in local storage
      window.localStorage.setItem("selectedLanguage", language);
      // Reload the page to reflect the language change
      window.location.reload();
    }
  };

  // Render the language selector dropdown
  return (
    <div
      className={`${"languageSelector"} ${className} ${
        activeDrop ? "active" : ""
      }`}
      ref={langDropRef}
    >
      {/* Display the currently selected language */}
      <span
        className={`${"current_lang"} cursor-pointer`}
        onClick={() => setActiveDrop(!activeDrop)}
        title={activeDrop ? "Click to close dropbox" : "Click to change language"}
      >
        {i18n.language}
      </span>
      {/* Render the dropdown menu */}
      <ul className={`${"lang_drop"}`}>
        {/* Render each language option */}
        <li
          onClick={() => handleLanguageChange("uz")}
          className={`${
            i18n.language === "uz" ? "selected_lang" : ""
          } cursor-pointer`}
          title={i18n.language === "uz" ? `Selected language - Uzbek` : "Uzbek"}
        >
          uz
        </li>
        <li
          onClick={() => handleLanguageChange("en")}
          className={`${
            i18n.language === "en" ? "selected_lang" : ""
          } cursor-pointer`}
          title={i18n.language === "en" ? `Selected language - English` : "English"}
        >
          en
        </li>
        <li
          onClick={() => handleLanguageChange("ru")}
          className={`${
            i18n.language === "ru" ? "selected_lang" : ""
          } cursor-pointer`}
          title={i18n.language === "ru" ? `Selected language - Russian` : "Russian"}
        >
          ru
        </li>
      </ul>
    </div>
  );
}

export default LanguageSelector;
