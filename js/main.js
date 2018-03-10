$(document).ready(function() {

    //variables
    var modelSpecs,
        modelPrice,
        modelSpecsHolder,
        modelPriceHolder,
        modelPriceUSDHolder;

    modelSpecsHolder = $('#modelSpecs');
    modelPriceHolder = $('#modelPrice');
    modelPriceUSDHolder = $('#modelPriceUSD');
    modelPrice = 0;
    modelSpecs = '';

    //price calculator
    function calculatePrice(){
        var modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
        var modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val();
        var modelPricePackage = $('input[name=package]:checked', '#autoForm').val();
        
        modelPriceEngine = parseInt(modelPriceEngine);
        modelPriceTransmission = parseInt(modelPriceTransmission);
        modelPricePackage = parseInt(modelPricePackage);

        modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;

        modelPriceHolder.text(addSpace(modelPrice) + ' рублей');
    };


    //display all specs in modelSpecsHolder
    function compileSpecs(){
        modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text() + '<br/>';
        modelSpecs = modelSpecs + $('input[name=transmission]:checked + label', '#autoForm').text() + '<br/>';
        modelSpecs = modelSpecs + $('input[name=package]:checked + label', '#autoForm').text() + '.';
        modelSpecsHolder.html(modelSpecs);
    };



    //run on input selection change
    $('#autoForm input').on('change', function(){
        calculatePrice();
        compileSpecs();
        calculateUSD();
    });


    //run on document ready
    calculatePrice();
    compileSpecs();


    //color selection
    $('#colorsSelector .colorItem').on('click', function() {
        var imagePath = $(this).attr('data-img-path');
        $('#imgHolder img').attr('src', imagePath);
    });

    //adding spaces to modelPriceHolder
    function addSpace(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ' ' + '$2');
        }
        return x1 + x2;
    };

    //RubToUsd Converter
    var currencyUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';
    var rurUsdRate = 0;

    $.ajax({
        url: currencyUrl,
        cache: false,
        success: function(data){
            data = JSON.parse(data);
            rurUsdRate = data.Valute.USD.Value;
        
            calculateUSD();
        }
    });
    
    function calculateUSD(){
        var modelPriceUSD = modelPrice / rurUsdRate;
        modelPriceUSDHolder.text('$ ' + addSpace( modelPriceUSD.toFixed(0) ) );
    }

});