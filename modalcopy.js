(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });


  $(document).ready(function(){
    $("#btn btn-primary").click(function(){
      $("#exampleModal").modal("show");

      });
      
      //Dynamic content of modal
      $('#exampleModal').on('show.bs.modal', function (event) {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#exampleModal').removeClass('in');
        });
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('name') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        
        var src = 'http://www.youtube.com/v/FSi2fJALDyQ&amp;autoplay=1';
        var modal = $(this)
        modal.find('.modal-title').text('YouTube video from ' + recipient)
        modal.find('.modal-body iframe').val(recipient)
        $('#exampleModal iframe').attr('src', src);
      });
      $("#exampleModal").on('hidden.bs.modal', function (e) {
        $("#exampleModal iframe").attr("src", $("#exampleModal iframe").attr("src"));
      });
    });
  });


  $("#exampleModal").on('hidden.bs.modal', function (e) {
    $("#exampleModal iframe").attr("src", $("#exampleModal iframe").attr("src"));
  });

  $(function() {
      $(".video").click(function () {
        var theModal = $(this).data("target"),
        videoSRC = $(this).attr("data-video"),
        videoSRCauto = videoSRC;
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', '');
        });
      });
  });
  $('#videoModal').on('hidden.bs.modal', function (e) {
  $('#videoModal').find('iframe').attr('src', '');
  });

  })(jQuery); // End of use strict




