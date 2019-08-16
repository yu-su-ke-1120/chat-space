$(function(){
  var search_list = $("#user-search-result");
  var member_list = $("#chat_member");
  function appendProduct(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
                </div>`
    search_list.append(html);
  }
  function appendNoProduct(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>`
    search_list.append(html);
  }
  function appendMember(user_name, user_id){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${user_id}">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                  <p class="chat-group-user__name">${user_name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    member_list.append(html);
  }
  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json',
    })
    
    .done(function(users){
      console.log(users);
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendProduct(user);
        });
      }
      else{
        appendNoProduct("一致するメンバーがいません");
      }
    })
    .fail(function(users){
      alert("ユーザー検索に失敗しました");
    })
  });
  $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function(){
    $(this).parent().remove();
    var user_name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    appendMember(user_name, user_id)
  })
  $(document).on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function(){
    $(this).parent().remove();
  })
});