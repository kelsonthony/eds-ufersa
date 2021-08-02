(function(win, doc) {
    'use strict';

    function appAutocomplete() {

        var $uquery = doc.querySelector('[data-js="uquery"]');
        
        $uquery.addEventListener('click', handleSubmitAutocompleteCustom, false);

        function handleSubmitAutocompleteCustom(event) {    
                //event.preventDefault();
            
                var promise = $.ajax({
                    type: 'POST',
                    url: 'https://widgets.ebscohost.com/prod/customerspecific/ns016613/edsapi/',
                    async: false,
                    dataType: "json"
                });

                
                promise.done(appAutocomplete)
                
                promise.fail(function() {
                    return console.log('Promise fail')
                })
                
                
                var result = JSON.parse(promise.responseJSON)

                //console.log('result', result)

                if(result !== undefined) {

                    $uquery.addEventListener('keydown', startSearch, false);

                    function startSearch() {

                        var autocompleteurl = result.Autocomplete.Url;
                        var autocompleteToken = result.Autocomplete.Token;         
                        var autocompleteCustId = result.Autocomplete.CustId;
                        var searchvalue = event.target.value;
                        
                        var searchData = {
                            token: autocompleteToken,
                            term: searchvalue,
                            idx: "rawqueries",
                            filters: JSON.stringify([{
                                name: "custid",
                                values: [autocompleteCustId],
                                },
                            ]),
                        };

                        $(doc).ready(function () {
                            $.ajax({
                                type: "GET",
                                url: autocompleteurl,
                                data: searchData
                            })
                            .done(startAutocomplete)
                            .fail(function () {
                                console.log('Error to call autocomplete.');
                            });
                        });

                        function startAutocomplete(data) {
                            var terms = data.terms.map(startTerm);
                                $("#txtQuery").autocomplete({
                                    source: terms
                                });
                            return terms;            
                        }

                        function startTerm(wrapper) {
                            //console.log("wrapper.term: ", wrapper.term);
                            var result = wrapper.term;
                            return result;
                        }
                    }    
                }

        }

    }
    appAutocomplete();


})(window, document);
