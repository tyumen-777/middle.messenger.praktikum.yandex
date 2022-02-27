const signinTemplate = `
h1.signin__header Регистрация
form.signin__form(action="")
  div.signin__inputs
    != emailInput
    != loginInput
    != firstNameInput
    != secondNameInput
    != phoneInput
    != passwordInput
    != secondPasswordInput
  div.signin__buttons
    != submitButton
    a(href="/login").signin__login Войти
`;

export default signinTemplate;
