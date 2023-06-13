const ru = {
  pages: {
    home: {
      title: "Dom",
    },
    login: {
      title: "Страница авторизации",
      labelEmail: "Введите адрес электронной почты",
      labelPassword: "Введите пароль",
      btnLogin: "Войти",
      noAccaount: "У вас нет аккаунт?",
      noAccaountBtn: {
        link: "/register",
        text: "Зарегистрироваться",
      },
      btnGoogle: "Войти через Google",
    },
    register: {
      title: "Страница регистрации",
      labelName: "Введите ваше имя",
      labelEmail: "Введите адрес электронной почты",
      labelPassword: "Создайте свой пароль",
      labelConfirmPassword: "Подтвердите свой пароль",
      btnLogin: "Регистрация",
      account: "Уже есть аккаунт?",
      accountBtn: {
        link: "/login",
        text: "Войти",
      },
      btnGoogle: "Войти через Google",
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
          text: "Главная",
        },
        {
          link: "/projects",
          text: "Проекты",
        },
        {
          link: "/resume",
          text: "Резюме",
        },
      ],
    },
    contact: {
      title: "Контакт",
      labelName: "Имя",
      labelEmail: "Электронная почта",
      labelMessage: "Сообщение",
      btnSubmit: {
        submit: "Отправить сообщение",
        isSending: "Отправка..."
      },
      validations: {
        name: {
          required: "Требуется имя",
        },
        email: {
          email: "Неверный адрес электронной почты",
          required: "Требуется электронная почта",
        },
        message: {
          required: "Требуется сообщение",
        }
      },
      result: {
        success: "Сообщение успешно отправлено!",
        fail: "Не удалось отправить сообщение.",
      }
    },
    underConstruction: {
      title: "Скоро",
      text: "Этот сайт находится в разработке",
      info: "вы можете просмотреть эту страницу сейчас",
      btn: {
        link: "/resume",
        text: "Резюме"
      }
    },
  },
};

export default ru;
