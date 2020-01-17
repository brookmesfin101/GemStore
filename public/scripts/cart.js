$(document).ready(function(){    
    // Updates Total Price of Cart Items and Turns on cartUpdated Flag
    $("select[name*='-gemQuantity']").each((i, v) => {
        var el = $(v);

        el.change(() => {
            var name = $(el).attr("name").split("-gemQuantity")[0];
            var quantity = $(el).children("option:selected").val();            
            var price = $(`input[name='${name}-PerPrice'][type='hidden']`).val();

            $("." + name + "-TotalPrice").text((price * quantity).toFixed(2));
            if($("input[name='cartUpdated").val() === "false"){
                $("input[name='cartUpdated").val("true").change();
            }
        })        
    });
        
    $("input[name='cartUpdated").change((e) => {
        $("#CartUpdatedNotification").toggle(".d-none");
    })
});