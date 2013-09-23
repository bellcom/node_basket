(function ($) {
  Drupal.behaviors.node_basket = {
    attach: function (context, settings) {

      if(typeof Drupal.settings.node_basket !== 'undefined'){
        var nid = Drupal.settings.node_basket.nid;
        var markup = '<div id="nodebasket-status"><a href="/node_basket/basket/view">View basket</a>';

        $.get('/node_basket/basket/status/'+nid, function(data){
          if(data.err){
            $('#node-basket').html('<a id="add-to-nodebasket" href="#">Save this node</a>' + markup);

            $('#node-basket #add-to-nodebasket').click(function(){
              $('#node-basket #nodebasket-status').text('wait');

              $.get('/node_basket/basket/add/'+nid, function(data){
                if(!data.err){
                  $('#node-basket #nodebasket-status').text('success');
                }
              });

              setTimeout(function(){
                Drupal.behaviors.node_basket.attach();
              }, 3000);
            });
          }
          else {
            $('#node-basket').html('<a id="remove-from-nodebasket" href="#">Remove this node</a>' + markup);
            $('#node-basket #remove-from-nodebasket').click(function(){
              $('#node-basket #nodebasket-status').text('wait');

              $.get('/node_basket/basket/remove/'+nid, function(data){
                if(!data.err){
                  $('#node-basket #nodebasket-status').text('success');
                }
              });

              setTimeout(function(){
                Drupal.behaviors.node_basket.attach();
              }, 3000);
            });
          }
        });
      }
    }
  };

}(jQuery));
