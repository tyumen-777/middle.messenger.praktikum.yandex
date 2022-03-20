const chatWindowTemplate = `
div.chat__window_header
  div.chat__window_header-name Вадим
div.chat__window_history
  div.chat__window_date 19 июня
  div.chat__window_message.chat__window_message-partner
    div.chat__window_message-content Привет
    div.chat__window_message-time 11:56
  div.chat__window_message.chat__window_message-mine
    div.chat__window_message-content Нет
    div.chat__window_message-time 12:00
div.chat__window_footer
  div.chat__window_message-block
    != messageInput
  != sendButton
`;

export default chatWindowTemplate;
