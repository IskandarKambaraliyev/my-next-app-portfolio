import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/useTranslation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const Contact = ({ contactOpen, setContactOpen, contactOpenRef, openContact, closeContact }) => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const [result, setResult] = useState();

  const contactRef = useRef(null);
  const contactToggleRef = useRef(null);

  useEffect(() => {
    let contactHandler = (e) => {
      if(contactOpen && !contactRef.current.contains(e.target) && !contactToggleRef.current.contains(e.target) && !contactOpenRef.current.contains(e.target)){
        closeContact();
      }
    }

    let contactPopstate = () => {
      if(contactOpen) {
        setContactOpen(false);
      }
    }

    document.body.style.overflow = contactOpen ? "hidden" : "auto"

    document.addEventListener('click', contactHandler);
    window.addEventListener("popstate", contactPopstate);

    return () => {
      document.removeEventListener('click', contactHandler);
      window.removeEventListener("popstate", contactPopstate);
    }
  }, [contactOpen, contactRef, contactToggleRef, closeContact, contactOpenRef, setContactOpen]);

  const initialValues = {
    name: session ? session.user.name : "",
    email: session ? session.user.email : "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(
      t("components.contact.validations.name.required")
    ),
    email: Yup.string()
      .email(t("components.contact.validations.email.email"))
      .required(t("components.contact.validations.email.required")),
    message: Yup.string().required(
      t("components.contact.validations.message.required")
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setResult(t("components.contact.result.success"));
        setTimeout(() => {
          setResult("");
          resetForm();
        }, 4000);
      } else {
        setResult(t("components.contact.result.fail"));
        setTimeout(() => {
          setResult("");
        }, 4000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className={`contact_popup${contactOpen ? " active" : ""}`} onClose={closeContact}>
      <div className="wrapper" ref={contactRef}>
        <div className="toggle" onClick={closeContact} ref={contactToggleRef}>
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
            <h2 className="text-2xl font-bold mb-4">
              {t("components.contact.title")}
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="w-full flex flex-none sm:flex-1 flex-col">
                      <label htmlFor="name" className="font-medium mb-1">
                        {t("components.contact.labelName")}:
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        required
                        className={`p-2 border rounded-md ${
                          errors && errors.name && touched.name
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                    <div className="w-full flex flex-none sm:flex-1 flex-col">
                      <label htmlFor="email" className="font-medium mb-1">
                        {t("components.contact.labelEmail")}:
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={`p-2 border rounded-md ${
                          errors && errors.email && touched.email
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="example@gmail.com"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="message" className="font-medium mb-1">
                      {t("components.contact.labelMessage")}:
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      required
                      className={`p-2 border rounded-md resize-none h-52 ${
                        errors && errors.message && touched.message
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder="Hello"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      result ? "bg-green-700" : "bg-gray-800 hover:bg-gray-700"
                    } text-white font-bold py-2 px-4 rounded-md mr-auto shadow-lg`}
                  >
                    {/* {isSubmitting ? t("contact.btnSubmit.isSending") : t("contact.btnSubmit.submit")} */}
                    {result
                      ? result
                      : isSubmitting
                      ? t("components.contact.btnSubmit.isSending")
                      : t("components.contact.btnSubmit.submit")}
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <Link href="/login" locale={i18n.language} className="btn">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Contact;
