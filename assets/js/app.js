$(document).ready(function(){

    $("body")
        .on("click", "#submit_button", submitOrder) /* submit order */
        .on("click", ".delete_order_button", deleteOrderButton) /* delete order */
        .on("mouseover mouseleave", "li", onHoverDeleteButton)
});

let new_order_queue = 1;

function submitOrder() {
    let order           = $(this).siblings("#order");
    let list_of_orders  = $("#list_of_orders");
    let data_order_id   = Math.floor((Math.random() * 100000000));
  
    if(order.val() === "" || order.val().length < 10) {
        order.addClass("border_red");
        alert("Please add at least 10 characters.");
    }
    else {
        order.removeClass("border_red");
  
        /* Append a new order to the list */
        list_of_orders.append(`
            <li data-order-id="${data_order_id}">
                <button class="delete_order_button" type="button">X</button>
                <span>${new_order_queue}</span>
                <input type="text" value="${order.val()}">
            </li>`
        );
        /* Increment the order number for the next order */
        new_order_queue++;
    }
    order.val("");
}

function deleteOrderButton(){
    let order_id = $(this).closest("li").data("order-id");

    /* This will remove specific order from the list */
    $('li[data-order-id="' + order_id + '"]').remove();

    if ($("#list_of_orders li").length === 0) {
        /* This will reset the order queue to 1 if there are no orders anymore */
        new_order_queue = 1;
    }
}

function onHoverDeleteButton(event){
    let list_delete_button = $(this);
    let delete_button = list_delete_button.find(".delete_order_button");

    if (list_delete_button.length) {
        if (event.type === "mouseover") { 
            delete_button.show(); /* This will show the delete button */
        }
        else if(event.type === "mouseleave") { 
            delete_button.hide(); /* This will hide the delete button */
        }
    }
}