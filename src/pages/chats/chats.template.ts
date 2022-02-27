const chatsTemplate = `
nav.sidebar
  div.sidebar__profile_block
    a(href="/profile").sidebar__profile_link Профиль
  div.sidebar__searchbox_wrapper
    input(placeholder="Поиск").searchbox.sidebar__searchbox
  != chatList
if activeId
  main.chat__main.chat__main_includechat
    != chatWindow
else
  main.chat__main.chat__main_empty Выберите чат чтобы отправить сообщение
`;

export default chatsTemplate;
