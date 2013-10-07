(function ($) {
  Drupal.behaviors.node_basket = {
    attach: function (context, settings) {

      if(typeof Drupal.settings.node_basket !== 'undefined'){
        $('#node-basket').html('<div id="node-basket-basket"></div><div id="node-basket-toolbox"></div>');
        if(typeof Drupal.settings.node_basket.nid !== 'undefined'){
          var nid = Drupal.settings.node_basket.nid;
          var markup = '<div id="nodebasket-status">';

          $.get('/node_basket/basket/status/'+nid, function(data){
            if(data.err){
              $('#node-basket-basket').html('<a id="add-to-nodebasket" href="#">'+Drupal.t('Save to basket')+'</a>' + markup);

              $('#node-basket #add-to-nodebasket').click(function(){
                $('#node-basket #nodebasket-status').html('<span class="icon-node-basket-wait"></span>');

                $.get('/node_basket/basket/add/'+nid, function(data){
                  Drupal.behaviors.node_basket.updatestatus('#nodebasket-status', data.err);
                });

                Drupal.behaviors.node_basket.reattach();
              });
            }
            else {
              $('#node-basket-basket').html('<a id="remove-from-nodebasket" href="#">'+Drupal.t('Remove from basket')+'</a>' + markup);
              $('#node-basket #remove-from-nodebasket').click(function(){
                $('#node-basket #nodebasket-status').html('<span class="icon-node-basket-wait"></span>');

                $.get('/node_basket/basket/remove/'+nid, function(data){
                  Drupal.behaviors.node_basket.updatestatus('#nodebasket-status', data.err);
                });

                Drupal.behaviors.node_basket.reattach();
              });
            }
          });
        }

        if(Drupal.settings.node_basket.addtoolbox){
          $('#node-basket-toolbox').html('<a id="add-to-nodebasket-toolbox" href="#">Add to toolbox</a><div id="nodebasket-toolbox-status"></div><div id="nodebasket-toolbox-list" style="display: none";></div>');

          $('#node-basket #add-to-nodebasket-toolbox').click(function(){
            var position = $(this).position();

            $('#nodebasket-toolbox-list').css('top', position.top + $(this).height());
            $('#nodebasket-toolbox-list').css('left', position.left);
            $('#nodebasket-toolbox-list').toggle();
          });

          $.get('/node_basket/toolbox_list', function(data){
            $.each(data, function(key, value){
              $('#nodebasket-toolbox-list').append('<a class="nodebasket-add-to-toolbox" href="#" data-toolbox-id="' + key + '">' + value +'</a>');
            });

            $('.nodebasket-add-to-toolbox').click(function(){

              $('#nodebasket-toolbox-list').hide();
              $('#nodebasket-toolbox-status').html('<span class="icon-node-basket-wait"></span>');

              if(typeof Drupal.settings.node_basket.nid !== 'undefined'){
                $.get('/node_basket/basket/tb_add/'+ nid +'/' + $(this).data('toolbox-id'), function(data){
                    Drupal.behaviors.node_basket.updatestatus('#nodebasket-toolbox-status', data.err);
                });
              }
              else {
                $.get('/node_basket/basket/link_add/' + $(this).data('toolbox-id') + '/?url=' + encodeURIComponent(window.location.href) , function(data){
                    Drupal.behaviors.node_basket.updatestatus('#nodebasket-toolbox-status', data.err);
                });
              }
              Drupal.behaviors.node_basket.reattach();
            });
          });
        }
      }
      // show basket contents on hover
      $("[class^=js-toolbox_id-]").hide();
      $('.view-id-node_basket .views-row').hover(
        function(event){
          var id = $(this).find('.toolbox-title').data('toolbox-id');
          $(".js-toolbox_id-"+id).show();
        },
        function(event){
          $("[class^=js-toolbox_id-]").hide();
        }
      );
    },

    reattach: function(){
      setTimeout(function(){
        Drupal.behaviors.node_basket.attach();
      }, 6000);
    },

    updatestatus: function(el, err){
      if(!err){
        $('#node-basket '+ el).html('<span class="icon-node-basket-success"></span>');
      }
      else {
        $('#node-basket '+ el).html('<span class="icon-node-basket-error"></span>');
      }
    }
  };
}(jQuery));
