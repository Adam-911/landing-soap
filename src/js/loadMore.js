$(document).ready(function(){
    $(".produce_catalog_item").slice(0, 8).show();
    $("#loadMore").on("click", function(e){
      e.preventDefault();
      $(".produce_catalog_item:hidden").slice(0, 4).slideDown();
      if($(".produce_catalog_item:hidden").length == 0) {
        $("#loadMore").addClass("noContent");
      }
    });
});