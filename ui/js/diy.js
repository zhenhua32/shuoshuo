var base = 'http://127.0.0.1:8080/list/find?';
var color = [
  'red lighten-3',
  'pink lighten-3',
  'purple lighten-3',
  'blue lighten-3',
  'indigo lighten-3',
  'teal lighten-3',
  'green lighten-3',
  'lime lighten-3',
  'orange lighten-3',
  'blue-grey lighten-3'
]

function space(text) {
  let array = text.split('\n');
  let newtext = '';
  for (let i = 0; i < array.length; i++) {
    newtext = newtext + '<p>' + array[i] + '</p>'
  }
  return newtext;
}

function getlist(skip, limit) {
  $('.list').empty();
  $.ajax({
    url: base + 'skip=' + skip + '&limit=' + limit,
    dataType: 'json',
    jsonp: false,
    method: 'GET',
    crossDomain: true
  })
    .then(function (data, textStatus, jqXHR) {
      console.log(data.lists);
      for (let i = 0; i < data.lists.length; i++) {
        if (data.lists[i].type == 'comment')
          $('.list').append(
            '<li>' + space(data.lists[i].body) + '</li>'
          );
        if (data.lists[i].type == 'photo')
          $('.list').append(
            '<li><img src=' + data.lists[i].body + '></li>'
          );

        if (data.lists[i].type == 'link')
          $('.list').append(
            '<li><a href=' + data.lists[i].body + '>' +
            data.lists[i].body + '</a></li>'
          );

        $('.list li:last-child').addClass(function () {
          return color[Math.floor(Math.random() * color.length)]
        })
      }
    });
}

$(document).ready(function () {
  // 渣渣代码, 用了通配符好了一点点
  $('div[class*="insert"]').hide();

  getlist(0, 10);
});

// 注册事件
$('.fixed-action-btn ul li:nth-child(1)')
  .click(function () {
    $('div[class*="insert"]').hide();
    $('.insert_comment').toggle().focusin();
  });
$('.fixed-action-btn ul li:nth-child(2)')
  .click(function () {
    $('div[class*="insert"]').hide();
    $('.insert_photo').toggle();
  });
$('.fixed-action-btn ul li:nth-child(3)')
  .click(function () {
    $('div[class*="insert"]').hide();
    $('.insert_chart').toggle();
  });
$('.fixed-action-btn ul li:nth-child(4)')
  .click(function () {
    $('div[class*="insert"]').hide();
    $('.insert_link').toggle();
  });

// insert comment
$('.insert_comment form').submit(function (event) {
  event.preventDefault();
  $.ajax({
    url: 'http://127.0.0.1:8080/comment',
    dataType: 'json',
    jsonp: false,
    method: 'PUT',
    crossDomain: true,
    data: {
      body: $('#textarea1').val()
    }
  })
    .then(function (data, textStatus, jqXHR) {
      console.log(data);
      Materialize.toast('发送成功', 3000);
      $('#textarea1').val('').trigger('autoresize');
      $('div[class*="insert"]').hide();
      getlist(0, 10);
    }, function (jqXHR, textStatus, err) {
      Materialize.toast(jqXHR.responseJSON.msg, 6000);
      console.log(jqXHR);
      console.log(err);
    })
});
// insert photo
$('.insert_photo form').submit(function (event) {
  event.preventDefault();
  var file = $('.insert_photo form input')[0].files[0];
  var data = new FormData();
  data.append('body', file);
  data.append('title', file.name);
  data.append('type', file.type);

  $.ajax({
    url: 'http://127.0.0.1:8080/img',
    dataType: 'json',
    jsonp: false,
    method: 'PUT',
    crossDomain: true,
    data: data,
    processData: false,
    contentType: false
  })
    .then(function (data, textStatus, jqXHR) {
      console.log(data);
      Materialize.toast('发送成功', 3000);
      $('div[class*="insert"]').hide();
      getlist(0, 10);
    }, function (jqXHR, textStatus, err) {
      Materialize.toast(jqXHR.responseJSON.msg, 6000);
      console.log(jqXHR);
      console.log(err);
    })
});
// insert link
$('.insert_link form').submit(function (event) {
  event.preventDefault();
  $.ajax({
    url: 'http://127.0.0.1:8080/link',
    dataType: 'json',
    jsonp: false,
    method: 'PUT',
    crossDomain: true,
    data: {
      body: $('.insert_link form input').val()
    }
  })
    .then(function (data, textStatus, jqXHR) {
      Materialize.toast('发送成功', 3000);
      $('div[class*="insert"]').hide();
      getlist(0, 10);
    }, function (jqXHR, textStatus, err) {
      Materialize.toast(jqXHR.responseJSON.msg, 6000);
      console.log(jqXHR);
      console.log(err);
    })
});


