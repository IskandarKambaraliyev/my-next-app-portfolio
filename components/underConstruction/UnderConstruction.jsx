import React from "react";
import { navHeight } from "../navbar/Navbar";
import { useTranslation } from "@/useTranslation";
import Link from "next/link";

const UnderConstruction = () => {
  const { t, i18n } = useTranslation();
  return (
    <div
      className="underConstruction"
      style={{ "--navHeight": navHeight + "px" }}
    >
      <div className="container ">
        <h1 className="title">{t("components.underConstruction.title")}</h1>
        <p className="text">{t("components.underConstruction.text")}</p>
        <span className="info"><Link href={t("components.underConstruction.btn.link")} locale={i18n.language} className="link">{t("components.underConstruction.btn.text")}</Link> {t("components.underConstruction.info")}</span>
      </div>
    </div>
  );
};

export default UnderConstruction;
