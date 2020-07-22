$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Main-chat__user" data-message-id=${message.id}>
          <div class="Main-chat__user--name">
            ${message.user_name}
          </div>
          <div class="Main-chat__user--date">
            ${message.created_at}
          </div>
        </div>
        <div class="Main-chat__messages">
          <div class="Main-chat__messages--message">
            ${message.content}
          </div>
          <img class="Main-chat__messages__image" src="${message.image}">
        </div>`
      return html;
    } else {
      let html =
      `<div class="Main-chat__user" data-message-id=${message.id}>
        <div class="Main-chat__user--name">
          ${message.user_name}
        </div>
        <div class="Main-chat__user--date">
          ${message.created_at}
        </div>
      </div>
      <div class="Main-chat__messages">
        <div class="Main-chat__messages--message">
          ${message.content}
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Main-chat__user:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main-chat').append(insertHTML);
        $('.Main-chat').animate({ scrollTop: $('.Main-chat')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});