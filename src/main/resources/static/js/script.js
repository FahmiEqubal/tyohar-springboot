$(function() {

	// User Register validation

	var $userRegister = $("#userRegister");

	$userRegister.validate({

		rules: {
			name: {
				required: true,
				lettersonly: true
			}
			,
			email: {
				required: true,
				space: true,
				email: true
			},
			mobileNumber: {
				required: true,
				space: true,
				numericOnly: true,
				minlength: 10,
				maxlength: 12

			},
			password: {
				required: true,
				space: true

			},
			confirmpassword: {
				required: true,
				space: true,
				equalTo: '#pass'

			},
			address: {
				required: true,
				all: true

			},

			city: {
				required: true,
				space: true

			},
			state: {
				required: true,


			},
			pincode: {
				required: true,
				space: true,
				numericOnly: true

			}, img: {
				required: true,
			}

		},
		messages: {
			name: {
				required: 'name required',
				lettersonly: 'invalid name'
			},
			email: {
				required: 'email name must be required',
				space: 'space not allowed',
				email: 'Invalid email'
			},
			mobileNumber: {
				required: 'mob no must be required',
				space: 'space not allowed',
				numericOnly: 'invalid mob no',
				minlength: 'min 10 digit',
				maxlength: 'max 12 digit'
			},

			password: {
				required: 'password must be required',
				space: 'space not allowed'

			},
			confirmpassword: {
				required: 'confirm password must be required',
				space: 'space not allowed',
				equalTo: 'password mismatch'

			},
			address: {
				required: 'address must be required',
				all: 'invalid'

			},

			city: {
				required: 'city must be required',
				space: 'space not allowed'

			},
			state: {
				required: 'state must be required',
				space: 'space not allowed'

			},
			pincode: {
				required: 'pincode must be required',
				space: 'space not allowed',
				numericOnly: 'invalid pincode'

			},
			img: {
				required: 'image required',
			}
		}
	})


	// Orders Validation

	var $orders = $("#orders");

	$orders.validate({
		rules: {
			firstName: {
				required: true,
				lettersonly: true
			},
			lastName: {
				required: true,
				lettersonly: true
			}
			,
			email: {
				required: true,
				space: true,
				email: true
			},
			mobileNo: {
				required: true,
				space: true,
				numericOnly: true,
				minlength: 10,
				maxlength: 12

			},
			address: {
				required: true,
				all: true

			},

			city: {
				required: true,
				space: true

			},
			state: {
				required: true,


			},
			pincode: {
				required: true,
				space: true,
				numericOnly: true

			},
			paymentType: {
				required: true
			}
		},
		messages: {
			firstName: {
				required: 'first required',
				lettersonly: 'invalid name'
			},
			lastName: {
				required: 'last name required',
				lettersonly: 'invalid name'
			},
			email: {
				required: 'email name must be required',
				space: 'space not allowed',
				email: 'Invalid email'
			},
			mobileNo: {
				required: 'mob no must be required',
				space: 'space not allowed',
				numericOnly: 'invalid mob no',
				minlength: 'min 10 digit',
				maxlength: 'max 12 digit'
			}
			,
			address: {
				required: 'address must be required',
				all: 'invalid'

			},

			city: {
				required: 'city must be required',
				space: 'space not allowed'

			},
			state: {
				required: 'state must be required',
				space: 'space not allowed'

			},
			pincode: {
				required: 'pincode must be required',
				space: 'space not allowed',
				numericOnly: 'invalid pincode'

			},
			paymentType: {
				required: 'select payment type'
			}
		}
	})

	// Reset Password Validation

	var $resetPassword = $("#resetPassword");

	$resetPassword.validate({

		rules: {
			password: {
				required: true,
				space: true

			},
			confirmPassword: {
				required: true,
				space: true,
				equalTo: '#pass'

			}
		},
		messages: {
			password: {
				required: 'password must be required',
				space: 'space not allowed'

			},
			confirmpassword: {
				required: 'confirm password must be required',
				space: 'space not allowed',
				equalTo: 'password mismatch'

			}
		}
	})







})



jQuery.validator.addMethod('lettersonly', function(value, element) {
	return /^[^-\s][a-zA-Z_\s-]+$/.test(value);
});

jQuery.validator.addMethod('space', function(value, element) {
	return /^[^-\s]+$/.test(value);
});

jQuery.validator.addMethod('all', function(value, element) {
	return /^[^-\s][a-zA-Z0-9_,.\s-]+$/.test(value);
});


jQuery.validator.addMethod('numericOnly', function(value, element) {
	return /^[0-9]+$/.test(value);
});



/*document.getElementById('placeOrderButton').addEventListener('click', function(e) {
	const paymentType = document.getElementById('paymentType').value;
	if (paymentType === 'ONLINE') {
		e.preventDefault();
		const totalOrderPrice = document.getElementById('totalOrderPrice').value * 100;
		fetch('/user/create-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: totalOrderPrice }),
		})
			.then(response => response.json())
			.then(data => {
				const options = {
					key: data.key,
					amount: data.amount,
					currency: 'INR',
					name: 'Your Company',
					description: 'Purchase Description',
					image: '/images/logo.png',
					order_id: data.orderId,
					handler: function(response) {
						document.getElementById('razorpayOrderId').value = response.razorpay_order_id;
						document.getElementById('razorpayPaymentId').value = response.razorpay_payment_id;
						document.getElementById('razorpaySignature').value = response.razorpay_signature;
						document.getElementById('orders').submit();
					},
					prefill: {
						name: document.querySelector('input[name="firstName"]').value + ' ' + document.querySelector('input[name="lastName"]').value,
						email: document.querySelector('input[name="email"]').value,
						contact: document.querySelector('input[name="mobileNo"]').value,
					},
					notes: {
						address: document.querySelector('input[name="address"]').value,
					},
					theme: {
						color: '#3399cc',
					},
				};
				const rzp1 = new Razorpay(options);
				rzp1.open();
			});
	}
});*/

/*document.getElementById('placeOrderButton').addEventListener('click', function(e) {
	const paymentType = document.getElementById('paymentType').value;
	if (paymentType === 'ONLINE') {
		e.preventDefault();
		const totalOrderPrice = document.getElementById('totalOrderPrice').value * 100;
		fetch('/user/create-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: totalOrderPrice }),
		})
		.then(response => response.json())
		.then(data => {
			const options = {
				key: data.key,
				amount: data.amount,
				currency: 'INR',
				name: 'Your Company',
				description: 'Purchase Description',
				image: '/images/logo.png',
				order_id: data.orderId,
				handler: function (response) {
					document.getElementById('razorpayOrderId').value = response.razorpay_order_id;
					document.getElementById('razorpayPaymentId').value = response.razorpay_payment_id;
					document.getElementById('razorpaySignature').value = response.razorpay_signature;
					document.getElementById('orders').submit();
				},
				prefill: {
					name: document.querySelector('input[name="firstName"]').value + ' ' + document.querySelector('input[name="lastName"]').value,
					email: document.querySelector('input[name="email"]').value,
					contact: document.querySelector('input[name="mobileNo"]').value,
				},
				notes: {
					address: document.querySelector('input[name="address"]').value,
				},
				theme: {
					color: '#3399cc',
				},
			};
			const rzp1 = new Razorpay(options);
			rzp1.open();
		});
	}
});*/

/*document.getElementById('placeOrderButton').addEventListener('click', function (e) {
	const paymentType = document.getElementById('paymentType').value;

	if (paymentType === 'ONLINE') {
		e.preventDefault();
		const totalOrderPrice = document.getElementById('totalOrderPrice').value * 100;

		fetch('/user/create-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: totalOrderPrice }),
		})
		.then(response => response.json())
		.then(data => {
			console.log("Order Created: ", data); // Debugging line

			const options = {
				key: data.key,
				amount: data.amount,
				currency: 'INR',
				name: 'Your Company',
				description: 'Purchase Description',
				image: '/images/logo.png',
				order_id: data.orderId,
				handler: function (response) {
					console.log("Payment Successful: ", response); // Debugging line
					document.getElementById('razorpayOrderId').value = response.razorpay_order_id;
					document.getElementById('razorpayPaymentId').value = response.razorpay_payment_id;
					document.getElementById('razorpaySignature').value = response.razorpay_signature;

					document.getElementById('orders').submit();
				},
				prefill: {
					name: document.querySelector('input[name="firstName"]').value + ' ' +
						  document.querySelector('input[name="lastName"]').value,
					email: document.querySelector('input[name="email"]').value,
					contact: document.querySelector('input[name="mobileNo"]').value,
				},
				notes: {
					address: document.querySelector('input[name="address"]').value,
				},
				theme: {
					color: '#3399cc',
				},
			};

			const rzp1 = new Razorpay(options);
			rzp1.on('payment.failed', function (response) {
				console.error("Payment Failed: ", response);
				alert("Payment failed. Please try again.");
			});

			rzp1.open();
		})
		.catch(error => {
			console.error("Error creating order: ", error);
			alert("Failed to initiate payment. Please try again.");
		});
	}
});*/

