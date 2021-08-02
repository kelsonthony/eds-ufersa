(function(win, doc) {
  'use strict';

  function appFilterCustom(){
      
      var $form1 = doc.querySelector('[data-js="filter-custom"]');
      var $hiddencustom1 = doc.querySelector('[data-js="hiddencustom"]');
      var optionfilterone = doc.querySelector('[data-js="select"]');
      var newevent = doc.createEvent('Event');
      
      newevent.initEvent('build', true, true);
      
      $form1.addEventListener('click', handleSearch, false);

      optionfilterone.addEventListener('change', handleChange, false);
      
      function handleChange(event){
          var change = $hiddencustom1;
          change.value = event.target.value;
      }
      
      function handleSearch(event) {
          var $bquery = event.target.form.bquery;
          var $uquery = event.target.form.uquery;
          return  ($bquery.value = $hiddencustom1.value + $uquery.value);
      }

  }
  win.appFilterCustom = appFilterCustom();
})(window, document);