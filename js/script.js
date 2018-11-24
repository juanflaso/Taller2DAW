function addNew(titulo, contenido, image, date) {
  var tweet = $("<div/>", {
    "class": "row card-body"
  });

  var imgDiv = $("<div/>", {
    "class": "col-1 "
  });
  var img = $("<img/>", {
    src: image,
    "class": "rounded-circle profilePic embed-responsive embed-responsive-1by1"
  });

  var tweetContent = $("<div/>", {
    "class": "col-11"
  });

  var titleRow = $("<div/>", {
    "class": "row"
  });

  var contentRow = $("<div/>", {
    "class": "row"
  });
  var timeRow = $("<div/>", {
    "class": "row"
  });

  var title = $("<h5/>", {
    html: titulo,
  });

  var content = $("<p/>", {
    html: contenido
  });

  var time = $("<time/>", {
    html: date
  });


  title.appendTo(titleRow);
  content.appendTo(contentRow);
  time.appendTo(timeRow);
  titleRow.appendTo(tweetContent);
  contentRow.appendTo(tweetContent);
  timeRow.appendTo(tweetContent);
  img.appendTo(imgDiv);
  imgDiv.appendTo(tweet);
  tweetContent.appendTo(tweet);
  tweet.appendTo("#noticias");
}




function loadTweets() {
  $.ajax({
    type: "GET",
    url : "https://twitrss.me/twitter_user_to_rss/?user=elonmusk",
    dataType: "xml",
    success: function(xml) {
      var image = $(xml).find("image").text();
      console.log(image);
      $(xml).find("item").each(function(){
        var creator = $(this).find("dc\\:creator").text().replace("(", "").replace(")","");
        var descripcion = $(this).find("description").text();
        var date = $(this).find("pubDate").text();        
        console.log(creator);
        console.log(descripcion);
        addNew(creator, descripcion, image, date);
      });
    },
    error: function(){
      alert("error");
    }
  });
}



$(document).ready(function(){
  loadTweets();

  $("button").click(function(e){

    var texto = $('input#buscador').val();
    
    if(texto.length != 0) {
      
      var noticias = $('#noticias .card-body');
      $('#noticias .card-body').filter(function(index){
        
        $(this).show();
        
        var noticia = $(this).text()
        if(noticia.indexOf(texto) == -1) {
          $(this).hide()
        }

      });

    } else {
      $('#noticias .card-body').each(function(){
        $(this).show();
      });
    }

    
    
  })
});

