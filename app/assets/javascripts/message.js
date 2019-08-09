$(function() {
  function buildHTML(message) {
    var image = ""
    message.image ? image = `<img src="${message.image}" class="chat-main__message__image">` : image = ""
    var html = `<div class="message">
                  <div class="chat-main__messages__upper-info">
                    <p class="chat-main__messages__upper-info--talker">
                      ${message.user_name}
                    </p>
                    <p class="chat-main__messages__upper-info--data">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="chat-main__messages__box">
                    <p class="chat-main__messages__box--text">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__messages').append(html);
      $("#new_message")[0].reset();
      $('.form__submit').removeAttr("disabled");
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('メッセージを入力してください');
    })
  })
});