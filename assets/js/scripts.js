document.addEventListener('DOMContentLoaded', function(){
	document.getElementById("calculate").addEventListener("click", function(event){
		event.preventDefault();
		console.log("hello !");
		var date = document.getElementById('month').value + " " + document.getElementById('day').value +", " + document.getElementById('year').value;
		console.log(date);
		var unixtime = Date.parse(date)/1000;
		console.log(unixtime);
		var amount = parseInt(document.getElementById('amount').value);


		// var oldPrice = ajax on "https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts="+unixtime
		// var currentPrice = ajax on "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
		// var quantity = amount / oldPrice
		// var currentValue = quantity * currentPrice

		var oldPriceURL = "https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts="+unixtime;
		var oldPriceXHR = new XMLHttpRequest();
		var currentPriceXHR = new XMLHttpRequest();
		var currentPriceURL = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";
		var currentPrice;
		var oldPrice;
		var currentValue;
		var quantity;


	  	oldPriceXHR.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		    	setTimeout(findCurrentPrice(), 5000);
			    oldPrice = JSON.parse(this.responseText);
			    var answer = document.getElementById("answer");
			    var asOf = "As of "+dateFormat();
			    document.getElementById("asOf").innerHTML = asOf;


		    }
		};
		oldPriceXHR.open("GET", oldPriceURL, true);
		oldPriceXHR.send();

		function findCurrentPrice(){
			console.log("this was delayed");
			currentPriceXHR.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
			    currentPrice = JSON.parse(this.responseText);
			    //console.log("currentPrice coming");
			    //console.log(currentPrice);
			    console.log("old Price is "+oldPrice["BTC"]["USD"]);
			    quantity = amount / parseInt(oldPrice["BTC"]["USD"]);
			    console.log(amount,"amount");

			    currentValue = parseFloat(currentPrice["USD"]) * quantity;

			    answer.innerHTML = "You'd have $"+currentValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
;
			    //currentPrice["USD"]+" old price is "+oldPrice["BTC"]["USD"];
			    /*setTimeout(function(){

			    } , 5000);*/
		    }
			};
			currentPriceXHR.open("GET", currentPriceURL, true);
			currentPriceXHR.send();
		}



	});


	function dateFormat() {
		var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec");
		var d = new Date();
		var dateNow = d.getDate();
		var monthNow = d.getMonth();
		var yearNow = d.getFullYear();
		return months[monthNow] +" "+ dateNow + ", " + yearNow;
	}

// end fake document ready
}, false);


