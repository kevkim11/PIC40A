
// document.write("<h1>Hello World!</h1>");

// var ar1 = []; // unique array
// var ar2 = []; // frequency array
// var textarea_node = document.getElementById("tags");
// var previous_texts = "";

function makeCloud() {
	var ar1 = []; // unique array
	var ar2 = []; // frequency array

	var textarea_node = document.getElementById("tags");
	var text = textarea_node.value;
	var text_array = text.split(' ');
	text_array.sort();

	//console.log("sorted: " + text_array);

	//Need initalize the unique array
	for (var i=0; i<text_array.length; i++){
		//console.log("length of ar1 " + ar1.length);
		if(ar1.length==0) { //put in the first element. 
			ar1.push(text_array[0]); //add the first element
			ar2.push(1);//put the first count to 1
		}
		else {
			var end_element = ar1[ar1.length - 1];
			// ar1.push(end_element);
			// ar2.push(count);
			//console.log("end_element " + end_element)
			if (text_array[i]==end_element){ // if there's already a unique element, then just go to the next one
				//console.log("element already in unique array --> end_element = " + end_element);
				var count = ar2.pop();
				ar2.push(count+=1);
				continue;
			}
			else {
				ar1.push(text_array[i]);
				ar2.push(1)
			}
		}
	}

	var max = max_freq(ar2);
	// console.log("max frequency = " + max);
	// alert(text); // debugger

	var font_size_ar=assign_font_size(max, ar2);
	//console.log(font_size_ar);

	//get our div element so we can add the link to it
	my_div_node = document.getElementById("TagCloud");
	// if(my_div_node==null){
	// 	my_div_node = document.getElementById("TagCloud2");
	// }
	// new_div_node = createElementById("TagCloud2");
	new_div_node = document.createElement("div");
	new_div_node.setAttribute("id", "TagCloud");
	new_div_node.setAttribute("class", "tagCloud");
	//Helper function to make the tagCloud
	add_tagCloud(ar1, ar2, font_size_ar);
	
	my_div_node.parentNode.replaceChild(new_div_node, my_div_node);
	// var containerHeight = document.my_div_node.offsetHeight;
	// var lastChild = my_div_node.childNodes[my_div_node.childNodes.length - 1];
	// var verticalOffset = lastChild.offsetTop + lastChild.offsetHeight;
	// my_div_node.style.height = verticalOffset + "px"
	
	// addLinks(ar1,font_size_ar);



	var all_nodes = document.getElementsByTagName("*");
	// console.log(all_nodes);
}

/*
loop through all the span child elements (the tags) in the div 
(tag cloud) and assign a suitable font size to them. 
The font size should at least be 15pt.
The font size will be determined by 
taking the frequency at which the tag occurs divided by the max number of occurrences, 
then the resulting fraction is multiplied by 20. 
This will give you a decimal number between 0 and 20. 
Round the number to nearest integer and add 15.
Now append the string "pt" and you have a string that is something like "22pt". 
This string should be used in setting the font-size. (I suggest defining a helper function to do this step.)
*/
function assign_font_size(max_freq, ar2){
	var font_size_ar = [];
	for(var i=0; i<ar2.length; i++){
		var ratio = Math.round((ar2[i]/max_freq)*20)+15;
		var ratio_string = ratio+"pt";
		// console.log("Math.round((ar2["+i+"]/max_freq)*20);" + ratio);
		// console.log("ratio_string =" + ratio_string);
		font_size_ar.push(ratio_string);
	}
	// console.log(font_size_ar);
	return font_size_ar;
}

//5. keep track of the maximum frequency for the set of tags. (Write a helper function to compute this.)
function max_freq(ary){
	var max_freq = 0;
	for(var i=0; i<ary.length; i++){
		if (max_freq<ary[i]){
			max_freq = ary[i];
		}
	}
	return max_freq;
}
//6. create adivelement containing all the tags asspanelements as described above. (You should write a helper fuction to achieve this.)
function add_tagCloud(ar1, ar2, font_size_ar){
	for (var i=0; i<ar1.length; i++){
		//Create an element but it is not in the DOM yet
		newNode = document.createElement("span");
		//Set the attribute of the node
		newNode.setAttribute("id", ar1[i]);
		newNode.setAttribute("class", "cloudTagWord");
		// font_size = font_size_ar[i]
		newNode.style.fontSize = font_size_ar[i];
		// console.log("font_size_ar[i] "+font_size_ar[i]);
		newNode.innerHTML = ar1[i];
		s = ar1[i]+": "+ar2[i]+" occurrences";
		//Add an onclick event using CLOSURE
		//Can also just use .setAttribute in order to set individual elements
		//EX: newNode.setAttribute("onclick", "s"); where s=Alert()
		newNode.onclick = function(string){
			return function() {
				alert(string);
			};
		}(s);
	  	new_div_node.appendChild(newNode);
	}
}
// function setCookie(start_time,end_session_time,total_time,flag,count){
//     document.cookie = "start_time="+start_time;;

//     if(end_session_time) {
//         document.cookie ="end_session_time="+end_session_time;
//     }

//     if(total_time){
//         document.cookie ="total_time="+total_time;
//     }
//     if(flag){
//         document.cookie ="flag="+flag;
//     }
//     if(count){
//         document.cookie = "count="+count;
//     }

//     console.log("document.cookie ="+ document.cookie);
// }


function setCookies(ar1, ar2, exdays) {
	for(var i=0; i<ar1.length; i++){
		var d = new Date();
    	d.setTime(d.getTime() + (exdays*24*60*60*1000));
    	var expires = "expires="+d.toUTCString();
    	document.cookie = ar1[i] + "=" + ar2[i] + "; " + expires;
    	console.log("document.cookie ="+ document.cookie);
	}
}
function readCookie(name){
     var nameEQ = name + "=";
     var ca = document.cookie.split(';');
     for (var i=0; i < ca.length; i++){
     	var c = ca[i];
		while (c.charAt(0)==' '){
          c = c.substring(1,c.length-1);
		}
   		if (c.indexOf(nameEQ) == 0){
			return c.substring(nameEQ.length,c.length-1);
   		}
    }
    return null;
}

function saveCloud() {
	var ar1 = []; // unique array
	var ar2 = []; // frequency array

	var textarea_node = document.getElementById("tags");
	var text = textarea_node.value;
	var text_array = text.split(' ');
	text_array.sort();

	//console.log("sorted: " + text_array);

	//Need initalize the unique array
	for (var i=0; i<text_array.length; i++){
		//console.log("length of ar1 " + ar1.length);
		if(ar1.length==0) { //put in the first element. 
			ar1.push(text_array[0]); //add the first element
			ar2.push(1);//put the first count to 1
		}
		else {
			var end_element = ar1[ar1.length - 1];
			// ar1.push(end_element);
			// ar2.push(count);
			//console.log("end_element " + end_element)
			if (text_array[i]==end_element){ // if there's already a unique element, then just go to the next one
				//console.log("element already in unique array --> end_element = " + end_element);
				var count = ar2.pop();
				ar2.push(count+=1);
				continue;
			}
			else {
				ar1.push(text_array[i]);
				ar2.push(1)
			}
		}
	}
	setCookies(ar1,ar2,1);
	alert("document.cookie equals to "+ document.cookie);
}

function loadCloud() {
	var textarea_node = document.getElementById("tags");
	var cookie_array = document.cookie.split(";");
	var load_array = [];
	console.log("cookie_array = "+cookie_array);
	for(var i=0; i<cookie_array.length; i++){
		var cookie_element = cookie_array[i];
		var cloud_elements = cookie_element.split("=");
		// console.log("cookie "+i+"is "+cookie_element);
		console.log("cloud_elements are "+cloud_elements[0]+" and "+cloud_elements[1]);
		var counter =Number(cloud_elements[1]);
		for (var j=0; j<counter; j++){
			load_array.push(cloud_elements[0]);
		}
		// if (counter==NaN){
		// 	return;
		// }else {
			
		// }
	}
	textarea_node.value = load_array.join(" ");
	// if(previous_texts==""){
	// 	return;
	// }
	// else {
	// 	var textarea_node = document.getElementById("tags");
	// 	textarea_node.value = previous_texts;
	// }
}

function clearArea() {
	var textarea_node = document.getElementById("tags");
	// previous_texts += textarea_node.value;
	textarea_node.value = "";
}


