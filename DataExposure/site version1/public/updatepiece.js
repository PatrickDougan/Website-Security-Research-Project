function updatePiece(id){
    $.ajax({
        url: '/test_site/music/' + id,
        type: 'PUT',
        data: $('#update-piece').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
