import Link from "next/link";
import styles from "../styles/login.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import loginValidate from "@/lib/validate";
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";
import { useTranslation } from "@/useTranslation";

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { t, i18n }= useTranslation();

  const firstInput = useRef(null);

  useEffect(() => {
    firstInput.current.focus();
  }, []);
  const [showPass, setShowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  });

  const [errorState, setErrorState] = useState()

  async function onSubmit(values) {
    setLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    }).then(response => {
      if (response.ok) {
        setLoading(false);
        router.push(response.url);
      } else{
        setLoading(false);
        setErrorState(response.error);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "/" });
  }

  return (
    <div className={styles.loginPage}>
      {loading && (
        <div className={`${styles.loading}`}>
          <Loader back />
        </div>
      )}
      <div className={styles.wrapper}>
      {errorState && <h3 className="text-center text-rose-500">{errorState}</h3>}

        <h1 className={styles.title}>{t("pages.login.title")}</h1>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.field}>
          <div className={styles.row}>
              <label htmlFor="password">{t("pages.login.labelEmail")}</label>
              <div
                className={`${styles.validation} ${
                  formik.errors.email && formik.touched.email
                    ? styles.show
                    : styles.hide
                }`}
              >
                *{formik.errors?.email}
              </div>
            </div>
            <div
              className={`${styles.input_wrapper} ${
                formik.errors.email && formik.touched.email
                  ? "border-rose-500"
                  : "border-gray-300"
              }`}
            >
              <input
                id="email"
                type="text"
                placeholder="example@gmail.com"
                {...formik.getFieldProps("email")}
                autoComplete="email"
                ref={firstInput}
              />
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.row}>
              <label htmlFor="password">{t("pages.login.labelPassword")}</label>
              <div
                className={`${styles.validation} ${
                  formik.errors.password && formik.touched.password
                    ? styles.show
                    : styles.hide
                }`}
              >
                *{formik.errors?.password}
              </div>
            </div>
            <div
              className={`${styles.input_wrapper} ${
                formik.errors.password && formik.touched.password
                  ? "border-rose-500"
                  : "border-gray-300"
              }`}
            >
              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Password1234"
                {...formik.getFieldProps("password")}
                autoComplete="password"
              />
              <div
                className={`${styles.icon} cursor-pointer hover:bg-gray-100`}
                onClick={() => setShowPass(!showPass)}
              >
                {!showPass ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <button type="submit">{t("pages.login.btnLogin")}</button>

          <span>
          {t("pages.login.noAccaount")} <Link href={t("pages.login.noAccaountBtn.link")} locale={i18n.language}>{t("pages.login.noAccaountBtn.text")}</Link>
          </span>
        </form>

        <div className={styles.providers}>
          <button onClick={handleGoogleSignIn}>
            <span>{t("pages.login.btnGoogle")}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
