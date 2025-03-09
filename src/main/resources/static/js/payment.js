$(document).ready(() => {
    $("#placeOrderButton").click(async (e) => {
        let paymentType = $("#paymentType").val();
        let totalOrderPrice = $("#totalOrderPrice").val();

        if (paymentType === "ONLINE") {
            e.preventDefault(); // Stop form submission
            $("#paymentError").text(""); // Clear any previous error
            $("#placeOrderButton").prop("disabled", true).text("Processing...");

            try {
                let formData = $("#orders").serialize(); // Serialize all form data
                let response = await $.post("/user/save-order", formData);

                if (!response || !response.orderId || !response.amount) {
                    throw new Error("Invalid Razorpay order response");
                }

                let options = {
                    key: "rzp_live_cWGcAi9NISkX9Z",
                    amount: response.amount * 100, // Amount in paise
                    currency: response.currency,
                    name: "Tyohar",
                    description: "Order Payment",
                    order_id: response.orderId,
                    handler: (response) => {
                        // Verify payment and save order
                        $.post("/user/verify-payment", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id
                        }).done(() => {
                            // Payment verified, submit the form
                            $("#orders").submit();
                        }).fail(() => {
                            $("#paymentError").text("Payment verification failed.");
                        });
                    },
                    theme: { color: "#3399cc" }
                };

                let rzp = new Razorpay(options);
                rzp.open();
            } catch (error) {
                $("#paymentError").text("Payment initiation failed. Please try again.");
                console.error("Payment Error:", error);
            } finally {
                $("#placeOrderButton").prop("disabled", false).text("Place Order");
            }
        }
    });
});