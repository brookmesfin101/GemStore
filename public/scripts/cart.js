$(document).ready(function(){    
    // Updates Total Price of Cart Items and Turns on cartUpdated Flag
    $("select[name*='-gemQuantity']").each((i, v) => {
        var el = $(v);

        el.change(() => {
            var name = $(el).attr("name").split("-gemQuantity")[0];
            var quantity = $(el).children("option:selected").val();            
            var price = $(`input[name='${name}-PerPrice'][type='hidden']`).val();

            $("." + name + "-TotalPrice").text((price * quantity).toFixed(2));
            
            if($("#CartUpdatedNotification").hasClass("d-none")){
                $("#CartUpdatedNotification").removeClass("d-none");
            }
        })        
    });
     
    $("#UpdateCart").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        var formData = [];
        
        $("input[name=id][type='hidden']").each((i, v) => {
            // ids.push($(v).val());
            var id = $(v).val();
            var name = $(`input[name=${id}]`).val();
            var gemQuantity = $(`select[name='${name}-gemQuantity']`).children("option:selected").val();
            formData.push({id: id, name: name, gemQuantity: gemQuantity});
        });        
                
        $.ajax({
            url: "/update-cart",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            cache: false
        }).done( function(result){
            if(!$("#CartUpdatedNotification").hasClass("d-none")){
                $("#CartUpdatedNotification").addClass("d-none");
            }
        })
    })
    
});