import { useTranslation } from "@/useTranslation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const UserInfo = ({
  userInfoOpen,
  setUserInfoOpen,
  openUserInfo,
  closeUserInfo,
  userInfoOpenerRef
}) => {
  const { data: session } = useSession();
  const { i18n } = useTranslation();
  const userInfoRef = useRef();
  const userInfoToggleRef = useRef();

  useEffect(() => {
    let userInfoHandler = (e) => {
      if( typeof window !== "undefined" && userInfoOpen && !userInfoRef.current.contains(e.target) && !userInfoToggleRef.current.contains(e.target) && !userInfoOpenerRef.current.contains(e.target)) {
        closeUserInfo();
        closeUserInfo();
      }
    }

    let userInfoPopstate = () => {
      if(userInfoOpen) {
        closeUserInfo();
      }
    }

    document.addEventListener("click", userInfoHandler);
    window.addEventListener("popstate", userInfoPopstate)

    return () => {
      document.removeEventListener("click", userInfoHandler);
      window.removeEventListener("popstate", userInfoPopstate)
    }
  }, [userInfoRef, userInfoToggleRef, closeUserInfo, userInfoOpen, userInfoOpenerRef])
  return (
    <div className={`userInfo_popup${userInfoOpen ? " active" : ""}`}>
      <div className="wrapper" ref={userInfoRef}>
        <div className="toggle" onClick={closeUserInfo} ref={userInfoToggleRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        {session ? (
          <>
            {" "}
            <p className="info" title="name">
              {session && session.user.name}
            </p>
            <p className="info" title="email">
              {session && session.user.email}
            </p>
            <button className="btn" onClick={signOut} title="Click to Sign out">
              Sign out
            </button>{" "}
          </>
        ) : (
          <Link href="/login" locale={i18n.language} className="py-4 px-6 bg-gray-800 text-white rounded-md shadow-lg mt-4">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
