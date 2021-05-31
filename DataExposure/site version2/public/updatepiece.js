function updatePiece(id){
    $.ajax({
        url: '/test_site2/music/' + id,
        type: 'PUT',
        data: $('#update-piece').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
