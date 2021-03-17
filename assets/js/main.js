//main.js
// routing for MMDB

$(document).foundation();

let myCart = {};
let myProducts = {};

Object.size = function (obj) {
    var size = 0,
        key, value = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
        if (obj.hasOwnProperty(key)) value = value + obj[key];
    }
    return value;
};

function getSplash() {
    $(".hideAll").hide();
    // call movie XHR
    // Populate splash div
    $(".splash").show();
}




function getProduct(search, department_id) {
    $(".hideAll").hide();
    // call movie XHR
    // Populate movie div
    if (search) {
        // do search
    } else {
        // do department
        let getProducts = $.ajax({
            url: "services/get_products_by_department.php",
            type: "POST",
            data: {
                department_id: department_id
            },
            dataType: "json"
        });

        getProducts.done(
            function (data) {
                //alert("The dingo ate my data!");

                if (data.error.id == 0) {
                    let content = "";

                    $.each(data.products, function (i, item) {

                        content += contentView(item);

                    });

                    // output to a div
                    $(".product_cards").html(content);

                } else {
                    alert(data.error.message);
                }

            }
        );

        getProducts.fail(function (jqXHR, textStatus) {
            alert("Something went Wrong! (getProducts)" +
                textStatus);
        });
    }

    $(".product").show();
}

function getCart() {
    $(".hideAll").hide();

    let json = JSON.stringify(myCart);

    // call people XHR


    let getCart = $.ajax({
        url: "services/get_products_by_cart.php",
        type: "POST",
        data: {
            json: json
        },
        dataType: "json"
    });

    getCart.done(
        function (data) {
            if (data.error.id == 0) {
                myProducts = data.products;
                buildCart();
                $(".cart").show();
            } else {
                alert(data.error.message);
            }
        }
    );

    getCart.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getCart)" +
            textStatus);
    });

}

function buildCart() {
    let content = `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">ITEM
                    </div>
                    <div class="large-1 cell">QUANTITY
                    </div>
                    <div class="large-2 cell">PRICE
                    </div>
                    <div class="large-2 cell">EXT. PRICE
                    </div>
                </div>`;

    let item_num = 1;
    let subtotal = 0.00;
    let subtotalTax = 0.00;

    $.each(myProducts, function (i, item) {
        let id = item.id;
        let upc = item.upc;
        let brand = item.brand;
        let product_name = item.product_name;
        let product_description = item.product_description;
        let price = item.avg_price;
        let quantity = item.quantity;
        let image_path = item.image_path;
        let extended_price = parseFloat(price) * parseInt(quantity);

        let extendPrice = extended_price.toFixed(2);
        subtotal = subtotal + parseFloat(extendPrice);

        if (item.taxable == "1") {
            subtotalTax = subtotalTax + parseFloat(extendPrice);
        }

        let avg_price = parseFloat(item.avg_price);
        let avgPrice = avg_price.toFixed(2);


        content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    <span class="cart-delete" data-id="${id}">X</span>
                    ${item_num}
                    </div>
                    <div class="large-6 cell">
                    <img style="width: 100px;" src="${image_path}" alt="${product_name}">
                    <br>${product_name}
                    </div>
                    <div class="large-1 cell">

                    <span class="cart-minus" data-id="${id}"> - </span>
                        
                    <span class="cart-quantity" id="cart_quantity_${id}"> ${quantity} </span>

                    <span class="cart-plus" data-id="${id}"> + </span>


                    </div>
                    <div class="large-2 cell">${avgPrice}
                    </div>
                    <div class="large-2 cell">${extendPrice}
                    </div>
                </div>`;
        ++item_num;

    });

    //alert(subtotal);
    let hst = subtotalTax * .13;
    let hstTotal = hst.toFixed(2);
    let total = hst + subtotal;
    let totalTotal = total.toFixed(2);

    content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">
                    </div>
                    <div class="large-1 cell">
                    </div>
                    <div class="large-2 cell">SUBTOTAL
                    </div>
                    <div class="large-2 cell">$${subtotal}
                    </div>
                </div>`;

    content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">
                    </div>
                    <div class="large-1 cell">
                    </div>
                    <div class="large-2 cell">HST
                    </div>
                    <div class="large-2 cell">$${hstTotal}
                    </div>
                </div>`;

    content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">
                    </div>
                    <div class="large-1 cell">
                    </div>
                    <div class="large-2 cell">TOTAL
                    </div>
                    <div class="large-2 cell">$${totalTotal}
                    </div>
                </div>`;

    content += `<div class="grid-x grid-padding-x">
                    <div class="large-1 cell">
                    </div>
                    <div class="large-6 cell">
                    </div>
                    <div class="large-1 cell">
                    </div>
                    <div class="large-2 cell">
                    </div>
                    <div class="large-2 cell">
                    <input type="button" id="checkout" value="Check Out">
                    </div>
                </div>`;

    $(".cart-container").html(content);

}

function getDepartments() {

    let getDepartment = $.ajax({
        url: "services/get_departments.php",
        type: "POST",
        dataType: "json"
    });

    getDepartment.done(
        function (data) {
            //alert("The dingo ate my data!");

            if (data.error.id == 0) {
                let content = "";

                $.each(data.departments, function (i, item) {
                    let department_id = item.id;
                    let department_name = item.name;

                    //console.log(lastName);
                    content += `<div class="getDepartment" data-id="${department_id}">${department_name}</div>`;
                });

                // output to a div
                $(".departments_list").html(content);

            } else {
                alert(data.error.message);
            }

        }
    );

    getDepartment.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getDepartment)" +
            textStatus);
    });
}

function getCheckout() {
    $(".hideAll").hide();
    $(".checkOut").show();
}

function createAccount(email, password, name_last, name_first) {

    //alert("TWO: " + email + password + name_last + name_first);
    let getCreateAccount = $.ajax({
        url: "services/create_account.php",
        type: "POST",
        data: {
            email: email,
            password: password,
            name_last: name_last,
            name_first: name_first
        },
        dataType: "json"
    });

    getCreateAccount.done(
        function (data) {
            //alert("The dingo ate my data!");

            if (data.error.id == 0) {
                // close the dialog
                //$('#createAccountModal').foundation('reveal', 'close');
                $('#createAccountModal').foundation('close');

            } else {
                alert(data.error.message);
            }

        }
    );
}

function loginAccount(email, password, ) {

    //alert("TWO: " + email + password + name_last + name_first);
    let getLoginAccount = $.ajax({
        url: "services/login_account.php",
        type: "POST",
        data: {
            email: email,
            password: password
        },
        dataType: "json"
    });

    getLoginAccount.done(
        function (data) {
            //alert("The dingo ate my data!");

            if (data.error.id == 0) {
                // close the dialog
                //$('#createAccountModal').foundation('reveal', 'close');
                // populate form

                $("#billing-name_last").val(data.billing_name_last);
                $("#billing-address").val(data.billing_address);
                $("#shipping-name_last").val(data.billing_name_last);
                $("#shipping-address").val(data.billing_address);

                $('#loginAccountModal').foundation('close');

            } else {
                alert(data.error.message);
            }

        }
    );
}

$(window).on("load", function () {

    // create account

    $("#create-account").click(
        function () {
            let email = $("#create-account-email").val();
            let password = $("#create-account-password").val();
            let name_last = $("#create-account-name-last").val();
            let name_first = $("#create-account-name-first").val();
            //alert("ONE: " + email + password + name_last + name_first);

            createAccount(email, password, name_last, name_first);
        }
    );

    // login account

    $("#login-account").click(
        function () {
            let email = $("#login-account-email").val();
            let password = $("#login-account-password").val();
            //alert("ONE: " + email + password + name_last + name_first);

            loginAccount(email, password);
        }
    );




    // BUTTONS

    $(document).on("click", "body #checkout", function () {
        location.href = `#/checkout/`;
    });



    $(document).on("click", "body .product-add-cart", function () {
        let product_id = $(this).attr("data-id");
        let quantity = $("#quantity_" + product_id).html();
        //alert(quantity);
        let quant = parseInt(quantity);
        //alert("second" + quant);

        if (myCart[product_id] != undefined) {
            let currentValue = myCart[product_id];
            myCart[product_id] = quant + parseInt(currentValue);
        } else {
            myCart[product_id] = quant;
        }


        console.log("PRODUCT: " + product_id + "-" + myCart[product_id]);

        let size = Object.size(myCart);
        //alert("size" + size);
        $(".cartCircle").html(size);

    });

    /*
    myCart[34] = 2;
    myCart[1346] = 1;
    myCart[239] = 2;
    */





    $(document).on("click", "body .product-plus", function () {
        let product_id = $(this).attr("data-id");
        let quantity = $("#quantity_" + product_id).html();
        //alert(quantity);
        let quant = parseInt(quantity);
        ++quant;
        //alert(quant);
        $("#quantity_" + product_id).html(quant);
    });

    $(document).on("click", "body .product-minus", function () {
        let product_id = $(this).attr("data-id");
        let quantity = $("#quantity_" + product_id).html();
        //alert(quantity);
        let quant = parseInt(quantity);
        if (quant > 1) {
            --quant;
        }
        //alert(quant);
        $("#quantity_" + product_id).html(quant);
    });

    $(document).on("click", "body .cart-delete", function () {
        var product_id = $(this).attr("data-id");
        alert(product_id);

        var deleteItem;

        $.each(myProducts, function (i, item) {
            if (item.id == product_id) {
                deleteItem = i;
            }
        });

        if (deleteItem != undefined) {
            myProducts.splice(deleteItem, 1);
        }

        delete myCart[product_id];
        var size = Object.size(myCart);
        $(".cartCircle").html(size);

        buildCart();
    });

    $(document).on("click", "body .cart-plus", function () {
        var product_id = $(this).attr("data-id");
        var quantity = parseInt(myCart[product_id] + 1);
        $.each(myProducts, function (i, item) {
            if (item.id == product_id) {
                myProducts[i]["quantity"] = quantity;
            }
        });
        myCart[product_id] = quantity;
        buildCart();
    });

    $(document).on("click", "body .cart-minus", function () {
        var product_id = $(this).attr("data-id");
        var quantity = parseInt(myCart[product_id] - 1);
        if (quantity < 1) {
            quantity = 1;
        }
        $.each(myProducts, function (i, item) {
            if (item.id == product_id) {
                myProducts[i]["quantity"] = quantity;
                //let q = myProducts[i].quantity;
            }
        });
        myCart[product_id] = quantity;
        buildCart();
    });


    // SAMMY ROUTING
    // Controller in MVC
    getDepartments();

    $(document).on("click", "body .getDepartment", function () {
        let department_id = $(this).attr("data-id");
        location.href = `#/product/${department_id}`;
    });


    var app = $.sammy(function () {

        this.get('#/splash/', function () {
            getSplash();
        });

        this.get('#/product/:id', function () {
            let department_id = this.params['id'];
            getProduct(0, department_id);
        });

        this.get('#/cart/', function () {
            getCart();
        });

        this.get('#/checkout/', function () {
            getCheckout();
        });

    });

    // default when page first loads
    $(function () {
        app.run('#/splash/');
    });
});
