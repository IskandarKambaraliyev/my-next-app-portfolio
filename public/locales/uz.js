const uz = {
  pages: {
    home: {
      title: "Uy",
    },
    login: {
      title: "Kirish sahafasi",
      labelEmail: "Email kiriting",
      labelPassword: "Parolingizni kiriting",
      btnLogin: "Kirish",
      noAccaount: "Akkauntingiz yo'qmi?",
      noAccaountBtn: {
        link: "/register",
        text: "Ro'yxatdan o'tish",
      },
      btnGoogle: "Google orqali kirish",
    },
    register: {
      title: "Ro'yxatdan o'tish sahifasi",
      labelName: "Ismingizni kiriting",
      labelEmail: "Email kiriting",
      labelPassword: "Parol o'ylab toping",
      labelConfirmPassword: "Parolni tasdiqlang",
      btnLogin: "Ro'yxatdan o'tish",
      account: "Akkauntingiz bormi?",
      accountBtn: {
        link: "/login",
        text: "Kirish",
      },
      btnGoogle: "Google orqali kirish",
    },
  },
  components: {
    navbar: {
      logo: {
        link: "/",
        text: "The Humanoid",
      },
      navLinks: [
        {
          link: "/",
          text: "Uy",
        },
        {
          link: "/projects",
          text: "Proyektlar",
        },
        {
          link: "/resume",
          text: "Rezyume",
        },
      ],
    },
    contact: {
      title: "Kontakt",
      labelName: "Ism",
      labelEmail: "Email",
      labelMessage: "Xabar",
      btnSubmit: {
        submit: "Xabarni yuborish",
        isSending: "Yuborilmoqda..."
      },
      validations: {
        name: {
          required: "Ismni kiritish zarur",
        },
        email: {
          email: "Noto'g'ri email",
          required: "Email kiritish zarur",
        },
        message: {
          required: "Xabarni kiritish zarur",
        }
      },
      result: {
        success: "Xabar muvaffaqiyatli yuborildi!",
        fail: "Xabarni yuborib bo'lmadi",
      }
    },
    underConstruction: {
      title: "Tez Orada",
      text: "Ushbu veb-sayt ishlab chiqilmoqda",
      info: "hozircha ushbu sahifani ko'rishingiz mumkin",
      btn: {
        link: "/resume",
        text: "Resume"
      }
    },
  },
};

export default uz;
