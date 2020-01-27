$(document).ready(function(){    
    // Updates Total Price of Cart Items and Turns on cartUpdated Flag
    $("select[name*='-gemQuantity']").each((i, v) => {
        var el = $(v);

        el.change(() => {
            var name = $(el).attr("name").split("-gemQuantity")[0];
            var quantity = $(el).children("option:selected").val();            
            var price = $(`input[name='${name}-PerPrice'][type='hidden']`).val();

            $("." + name + "-TotalPrice").text((price * quantity).toFixed(2));
            
            // if($("#CartUpdatedNotification").hasClass("d-none")){
            //     $("#CartUpdatedNotification").removeClass("d-none");
            // }
            if(!$("#CartUpdatedNotification").hasClass("show-notification")){
                $("#CartUpdatedNotification").toggleClass("show-notification hide-notification");
            }            
        })        
    });
     
    $("body").on("click", "#UpdateCart", function(e){
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
            // if(!$("#CartUpdatedNotification").hasClass("d-none")){
            //     $("#CartUpdatedNotification").addClass("d-none");
            // }
            $("#CartUpdatedNotification").toggleClass("show-notification hide-notification");
            if(result && result.cartCount){
                var el = $(".shopping-cart-count__text");
                if(el.hasClass("shopping-cart-count__text--padding") && result.cartCount > 9){
                    el.removeClass("shopping-cart-count__text--padding");
                }
                if(!el.hasClass("shopping-cart-count__text--padding") && result.cartCount <= 9){
                    el.addClass("shopping-cart-count__text--padding");
                }
                el.text(result.cartCount);
            }
        })
    })

    $("body").on("click", "#SubmitOrder", function(e){
        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            url: "/post-order",
            type: "POST",
            contentType: "application/json",
            cache: false
        }).done(() => {
            console.log("order posted");
        })
    });
});