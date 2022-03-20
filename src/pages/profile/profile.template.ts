const profileTemplate = `
div.back
  a(href='/').back__button
main.profile__container
  div.profile__block
    div.profile__block__avatar
    p.profile__block__name Артемий
    div.profile__block__info
      ul.profile__block_info-list
        li.profile__block__info-item
          span.profile__block__info-label Почта
          span.profile__block__info-value tyumen-777@yandex.ru
        li.profile__block__info-item
          span.profile__block__info-label Логин
          span.profile__block__info-value coler95
        li.profile__block__info-item
          span.profile__block__info-label Имя
          span.profile__block__info-value Артемий
        li.profile__block__info-item
          span.profile__block__info-label Фамилия
          span.profile__block__info-value Пудовкин
        li.profile__block__info-item
          span.profile__block__info-label Имя в чате
          span.profile__block__info-value Артемий
        li.profile__block__info-item
          span.profile__block__info-label Телефон
          span.profile__block__info-value +7 (999) 999 00 01
    div.profile__block_buttons
      ul.profile__block_buttons-list
        li.profile__block__buttons-item
          a(href='/profile-editing').profile__block_edit_button Изменить данные
        li.profile__block__buttons-item
          a(href='/profile-editing').profile__block_edit_button Изменить пароль
        li.profile__block__buttons-item
          a(href='/login').profile__block_exit_button Выйти
`;

export default profileTemplate;
