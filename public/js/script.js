$(document).ready(function() {
  var tabItems = $('.cd-tabs-navigation a');
  var tabContentWrapper = $('.cd-tabs-content');

  tabItems.on('click', function(event){
    event.preventDefault();
    var selectedItem = $(this);
    if( !selectedItem.hasClass('selected') ) {
      var selectedTab = selectedItem.data('content'),
        selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
        selectedContentHeight = selectedContent.innerHeight();

      tabItems.removeClass('selected');
      selectedItem.addClass('selected');
      selectedContent.addClass('selected').siblings('li').removeClass('selected');
      //animate tabContentWrapper height when content changes
      tabContentWrapper.animate({
        'height': selectedContentHeight
      }, 200);
    }
  });

  console.log("Document has loaded");
  var id = getParameterByName("id");
  var controller = new Controller(id, function() {
    setTimeout(function() {
      controller.render();
    }, 500);
  });
  window.controller = controller;
});

function animate() {
  window.controller.animate();
  requestAnimFrame(animate);
}
