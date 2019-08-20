$(function() {
  function buildHTML(message) {
    var image = message.image ? `<img src="${message.image}" class="chat-main__message__image">` : "";
    var html = `<div class="message" data-id="${message.id}">
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
      $('.form__submit').removeAttr("disabled");
    })
  })
  var reloadMessages = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message').last().data('id');
      var href = "api/messages"
      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id},
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
        });
        $('.chat-main__messages').append(insertHTML);
        $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      })
      .fail(function(){
        console.log('error!!!');
      });
    }else {
      clearInterval(reloadMessages);
    }
  }, 5000 );
});