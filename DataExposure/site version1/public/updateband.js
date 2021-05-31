function updateBand(id){
    $.ajax({
        url: '/test_site/bands/' + id,
        type: 'PUT',
        data: $('#update-band').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
