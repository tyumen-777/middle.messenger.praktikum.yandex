const profileEditingTemplate = `
div.back-block
  a(href='/').back-block__button
main.profile-block-container
  div.profile-block
    div.profile-block__avatar
    p.profile-block__name Иван
    div.profile-block__info
      ul.profile-block__info-list
        li.profile-block__info-item
          span.profile-block__info-label Почта
          div.profile-block__input-container
            != emailInput
        li.profile-block__info-item
          span.profile-block__info-label Логин
          div.profile-block__input-container
            != loginInput
        li.profile-block__info-item
          span.profile-block__info-label Имя
          div.profile-block__input-container
            != firstNameInput
        li.profile-block__info-item
          span.profile-block__info-label Фамилия
          div.profile-block__input-container
            != secondNameInput
        li.profile-block__info-item
          span.profile-block__info-label Имя в чате
          div.profile-block__input-container
            != chatNameInput
        li.profile-block__info-item
          span.profile-block__info-label Телефон
          div.profile-block__input-container
            != phoneInput
    div.profile-block__button-block
      != submitButton
`;

export default profileEditingTemplate;
