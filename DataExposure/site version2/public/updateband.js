function updateBand(id){
    $.ajax({
        url: '/test_site2/bands/' + id,
        type: 'PUT',
        data: $('#update-band').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
