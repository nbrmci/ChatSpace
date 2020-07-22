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

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Main-chat').append(html);      
      $('form')[0].reset();
      $('.Main-chat').animate({ scrollTop: $('.Main-chat')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop("disabled", false);
    });
  });
});