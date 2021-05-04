function updateInstrument(id){
    $.ajax({
        url: '/test_site/instruments/' + id,
        type: 'PUT',
        data: $('#update-instrument').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
