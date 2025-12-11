// Initialize all UI widgets and button actions after page loads
$(document).ready(function () {
	$("#mypage-header").hide();
	$("#overlay").show();

	// Slide down header
	$("#mypage-header").slideDown(10000, function () {
    	$("#overlay").hide();
    	$('#alert_modal').modal('show');
	});

	// Enable datepicker on input field
	$("#date_picker").datepicker();

	// Enable autocomplete with available tech list
	$(function () {
    var availableTechnologies = [
        "HTML", "CSS", "Java Script", "JQuery", "JQuery UI", "Java", "PHP"
    ];

    $("#auto_complete").autocomplete({
        source: function (request, response) {

            // filter results based on user input
            var results = $.ui.autocomplete.filter(availableTechnologies, request.term);

            // if no match, show message
            if (results.length === 0) {
                results = ["No technology found"];
            }

            response(results);
        },
        minLength: 0,
    }).click(function () {
        $(this).autocomplete("search", "");
    });
});


	// Activate Bootstrap tooltips
	$('[data-toggle="tooltip"]').tooltip();

	// Assign button click handlers to functions
	$("#cookie_button").click(setCookie);
	$("#reverse_button").click(() => reverseString(reverse_input.value));
	$("#max_of_two_button").click(() => maxOfTwoNumbers(num1.value, num2.value));
	$("#longest_word_button").click(() => longestWord(longest_input.value));

	// Load cookies on page startup and display stored values
	if (document.cookie != "") {
		let items = document.cookie.split(";");
		for (let item of items) {
			item = item.trim();
			if (item.startsWith("name="))
				display_name.innerText = item.substring(5);
			if (item.startsWith("phon="))
				display_phone.innerText = item.substring(5);
		}
	}
});

// Find maximum of two numbers and show result
function maxOfTwoNumbers(a, b) {
	first_number_error.innerText = "";
	second_number_error.innerText = "";

    // Check if values are empty
    if (a === "" && b === "") {
        alert("Inputs should not be empty");
        return;
    }

    if (a === "") {
		first_number_error.innerText = "enter first number";
		return;
	}

    if (b === "") {
		second_number_error.innerText = "enter second number";
		return;
	}

    // Convert to numbers
    a =BigInt(a);
    b = BigInt(b);

    // Check if both are same
    if (a === b) {
        alert("Inputs should be different");
        return;
    }

    // Display max number
    max_number_result.innerText = (a > b ? a : b);
}


// Reverse a string and show output
function reverseString(str) {
	if (str == "") return alert("Inputs should not be empty");
	string_reverse_result.innerText = [...str].reverse().join("");

}

// Find the longest word from comma-separated list
function longestWord(str) {
	if (str == "") return alert("Input should not be empty");
	let arr = str.split(",");
	let max = arr.reduce((a, b) => a.length > b.length ? a : b);
	longest_word_result.innerText = max.trim();
}

// Save name and phone into cookies and update display
function setCookie() {
	let name = user_name.value;
	let phone = user_phone.value;
	phone_error.innerText ="";
	name_error.innerText = "";
	if (name == "" && phone == "") {
		return alert("Inputs shoult not be empty");
	}
	if(name==""){
		name_error.innerText = "Name should not be empty";
		return;
	}
	if(phone==""){
		phone_error.innerText = "Phone number should not be empty";
		return;
	} 
	if(name.length>25){
		name_error.innerText = "Name character limit exceeds";
		return;
	}

	let letters = /^[A-Za-z ]+$/;
    if (!letters.test(name)) {
        name_error.innerText = "Name must contain only alphabets";
        return;
    }
	if(phone.length!=10){
		phone_error.innerText = "invalid phone number";
		return;
	}
	
	document.cookie = `name=${name}`;
	document.cookie = `phon=${phone}`;

	display_name.innerText = name;
	display_phone.innerText = phone;

	$("#my_toast").fadeIn(400); // show toast with fade
	setTimeout(function () {	//set time out for toast
		$("#my_toast").fadeOut(400);
	}, 3000);
}
