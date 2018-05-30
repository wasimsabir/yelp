$(document).ready(function(){

  $("ul.list-group").on("mouseenter", "li.list-group-item", function(){
    $(this).addClass("active");
  });
  $("ul.list-group").on("mouseleave", "li.list-group-item", function(){
    $(this).removeClass("active");
  });

});