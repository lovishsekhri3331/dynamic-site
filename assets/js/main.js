//main.js
// routing for MMDB

function getSplash() {
    $(".hideAll").hide();
    // call movie XHR
    // Populate splash div
    $(".splash").show();
}

function getCategoryItems(id) {
    $(".hideAll").hide();
    // call movie XHR
    // Populate movie div


    //$(".movie").html("MOVIE: " + id + content);
    $(".categoryItems").show();
}

function getCartItems(id) {
    $(".hideAll").hide();
    // call people XHR
    // Populate people div
    //$(".people").html("PEOPLE: " + id + content);
    $(".shoppingCart").show();

}

function getInformation(id){
    $(".hideAll").hide();
    $(".information").show();

}
function getPayment(id){
    $(".hideAll").hide();
    $(".payment").show();

}
function getConfirm(id){
    $(".hideAll").hide();
    $(".confirm").show();

}
function getCheckout(id){
    $(".hideAll").hide();
    $(".checkout").show();

}

$(window).on("load", function () {


    $(".logo").click(
        function () {
            location.href = "#/splash/";
        }
    );

    $(".item").click(
        function () {
            location.href = "#/item/123";
        }
    );

    $(".nav").click(
        function () {
            location.href = "#/cart/123";
        }
    );
    $(".infoButton").click(
        function () {
            location.href = "#/information/123";
        }
    );
    $(".paymentButton").click(
        function () {
            location.href = "#/payment/123";
        }
    );
    $(".confirmButton").click(
        function () {
            location.href = "#/confirm/123";
        }
    );
    $(".checkoutButton").click(
        function () {
            location.href = "#/checkout/123";
        }
    );


    // SAMMY ROUTING
    // Controller in MVC

    var app = $.sammy(function () {

        this.get('#/splash/', function () {
            getSplash();
        });

        this.get('#/item/:id', function () {
            let item_id = this.params['id'];
            getCategoryItems(item_id);
        });

        this.get('#/cart/:id', function () {
            let cart_id = this.params['id'];
            getCartItems(cart_id);
        });

        this.get('#/information/:id', function () {
            let information_id = this.params['id'];
            getInformation(information_id);
        });
        this.get('#/payment/:id', function () {
            let payment_id = this.params['id'];
            getPayment(payment_id);
        });
        this.get('#/confirm/:id', function () {
            let confirm_id = this.params['id'];
            getConfirm(confirm_id);
        });
        this.get('#/checkout/:id', function () {
            let checkout_id = this.params['id'];
            getCheckout(checkout_id);
        });

    });

    // default when page first loads
    $(function () {
        app.run('#/splash/');
    });
});



//changing the input from button
// let add = document.getElementById("btn-add");
// let sub = document.getElementById("btn-sub");
// let quantity = document.getElementById("input-quantity")

// add.addEventListener("click", addOneToInput)
// function addOneToInput(){
//     value = parseInt(quantity.innerHTML);
//     newValue = value + parseInt(1);
//     quantity.innerText = value
//     console.log(newValue);
    
// }
