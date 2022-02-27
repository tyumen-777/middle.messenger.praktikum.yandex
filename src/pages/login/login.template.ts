const loginTemplate = `
h1.login__header Вход
form.login__form(action="")
  div.login__form__inputs
    div !{loginField}
    div !{passwordField}
  div.login__form__buttons
    input(type='submit', value='Войти').login__form__button
    a(href='/signin').login__form__registration Зарегистрироваться
`;

export default loginTemplate;
