$("#GetAddItem").on("click", function(e){
    e.preventDefault();
    e.stopPropagation();

    $.ajax({
        url: "/admin/dashboard-getadditem",
        type: "POST",
        contentType: "application/json",        
    }).done( function(result) {
        $("#Dashboard-Main").html(result);
    })
});

$("#Dashboard").on("click", function(e){    
    e.preventDefault();
    e.stopPropagation();

    $.ajax({
        url: "/admin/dashboard-home",
        type: "POST",
        contentType: "application/json"
    }).done( function(result){
        $("#Dashboard-Main").html(result);
    })
});

$("#ViewCatalog").on("click", function(e){    
    e.preventDefault();
    e.stopPropagation();

    $.ajax({
        url: "/admin/dashboard-catalog",
        type: "POST",
        contentType: "application/json"
    }).done( function(result){
        $("#Dashboard-Main").html(result);
    })
});

$("body").on("click", "#AddItem", function(e){
    e.preventDefault();
    e.stopPropagation();

    var formData = {
        Name: $("#AddItemForm input[name=Name]").val(),
        Price: $("#AddItemForm input[name=Price]").val(),
        ImageURL: $("#AddItemForm input[name=ImageURL]").val(),
        Description: $("#AddItemForm input[name=Description]").val()
    }

    $.ajax({
        url: "/admin/add-item",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        cache: false
    }).done( function(result){
        $("#Dashboard-Main").html(result);
    })
});

function getEditPage(e) {
    e.preventDefault();
    e.stopPropagation();

    var grandParent = e.srcElement.parentElement.parentElement;
    var data = {
        id: $(grandParent).children("input[name=gemID]").val()
    }
    
    $.ajax({
        url: "/admin/edit-item",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        cache: false
    }).done(function(result){
        $("#Dashboard-Main").html(result);
    })
}

$("body").on("click", "#UpdateItem", function(e){
    e.preventDefault();
    e.stopPropagation();

    var formData = {
        ID: $("#EditItemForm input[name=ID]").val(),
        Price: $("#EditItemForm input[name=Price]").val(),
        ImageURL: $("#EditItemForm input[name=ImageURL]").val(),
        Description: $("#EditItemForm input[name=Description]").val()
    }

    $.ajax({
        url: "/admin/update-item",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        cache: false
    }).done( function(result){
        $("#Dashboard-Main").html(result);
    })
});
