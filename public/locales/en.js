const en = {
  pages: {
    home: {
      title: "Home",
    },
    login: {
      title: "Login page",
      labelEmail: "Enter your email",
      labelPassword: "Enter your password",
      btnLogin: "Sign in",
      noAccaount: "Don't have an account?",
      noAccaountBtn: {
        link: "/register",
        text: "Sign Up",
      },
      btnGoogle: "Sign in with Google",
    },
    register: {
      title: "Registration Page",
      labelName: "Enter your name",
      labelEmail: "Enter your email",
      labelPassword: "Create your password",
      labelConfirmPassword: "Confirm your password",
      btnLogin: "Register",
      account: "Already have an account?",
      accountBtn: {
        link: "/login",
        text: "Sign in",
      },
      btnGoogle: "Sign in with Google",
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
          text: "Home",
        },
        {
          link: "/projects",
          text: "Projects",
        },
        {
          link: "/resume",
          text: "Resume",
        },
      ],
    },
    contact: {
      title: "Contact",
      labelName: "Name",
      labelEmail: "Email",
      labelMessage: "Message",
      btnSubmit: {
        submit: "Send Message",
        isSending: "Sending..."
      },
      validations: {
        name: {
          required: "Name is required",
        },
        email: {
          email: "Invalid email address",
          required: "Email is required",
        },
        message: {
          required: "Message is required",
        }
      },
      result: {
        success: "Message sent successfully!",
        fail: "Failed to send message.",
      }
    },
    underConstruction: {
      title: "Coming Soon",
      text: "This website is under construction",
      info: "you can view this page for now",
      btn: {
        link: "/resume",
        text: "Resume"
      }
    },
  },
};

export default en;
