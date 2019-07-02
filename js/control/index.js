/*
@name= window.onload = function()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function runs when the page is loaded.
  @date = 11-11-2018
  @params= none
  @return = none
*/
window.onload =function(){
  showIntro();
};

/*
@name= introduceProducts()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function takes the values from the form and generates a dinamic HTML table according to the introduced Data
  @date = 11-11-2018
  @params= none
  @return = none
*/
function introduceProducts(){

  var codeType = document.getElementById('codeType').value;
  var numberProducts = document.getElementById('numberProducts').value;

if(isBlank(numberProducts)){ //validating introduced data
  alert("Input data must not be empty");
}else if (isNaN(numberProducts)) {
  alert("Input data must be a number");
}else if(isNegative(numberProducts)){
  alert("Input data must be greater than zero");
}else{ //if data are valid
      var strClient="";
      for(var i=0; i<numberProducts; i++){
          strClient += "<tr>";
          strClient += "<td><input type='text' class= 'clname' id='nameProduct' placeholder='Name product'></td>";
          strClient += "<td><input type='text' onkeypress=\"return validateCode(event,'"+ codeType +"')\" id='code' class='clcode' placeholder='Code product'></td>";
          strClient += "<td><input type='checkbox' class='clcheck' id='ckeck' value='yes'>Tested</td>";
          strClient += "</tr>";
      }
      window.parent.document.getElementById("tableProducts").innerHTML += strClient;
      window.parent.document.getElementById("frame").style.display = "none";
      window.parent.document.getElementById("2ndpart").style.display = "block";
}

}

/*
@name= loadData()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function takes the values from the div located in index.html and generates another dinamic html table
  with the name and code of products.
  @date = 11-11-2018
  @params= none
  @return = none
*/
function loadData(){

var sel = window.opener.frames[0].document.getElementById("codeType").value;

if(sel=="DNA"){
  document.getElementById("title").innerHTML+="DNA code";
}else{
  document.getElementById("title").innerHTML+="Protein code";
}

var name = window.opener.document.getElementsByClassName("clname");
var code = window.opener.document.getElementsByClassName("clcode");
var check = window.opener.document.getElementsByClassName("clcheck");


currentDate();

var result="";
for (var i=0; i<name.length; i++){
  result +="<tr>";
  result += "<td>" + name[i].value + "</td>";
  result += "<td>" + code[i].value + "</td>";
  var if_check="";
  if (check[i].checked) {
    if_check="YES";
  }else{
    if_check="NO";
  }
  result += "<td>" + if_check + "</td>";
  result +="</tr>";
}
document.getElementById("finalTable").innerHTML += result;

var total = window.opener.frames[0].document.getElementById("numberProducts").value;

document.getElementById("totalp").innerHTML += total;
}


/*
@name= currentDate()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function calculates the current date
  @date = 11-11-2018
  @params= none
  @return = none
*/
function currentDate(){
  var months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
  var daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var today = new Date();

  var date = daysWeek[today.getDay()] + ", " + today.getDate() + " of " + months[today.getMonth()] + " of " + today.getFullYear();

  document.getElementById("tdate").innerHTML += date;
}

/*
@name= introduceinDB()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if values of name and code are empty, and if not, throws an alert asking if you want to continue
  If you answer OK, a pop-up window will be open
  @date = 11-11-2018
  @params= none
  @return = none
*/
function introduceinDB(){
  var name = window.parent.document.getElementsByClassName("clname");
  var code = window.parent.document.getElementsByClassName("clcode");
  var flag = false;

  for (var i=0; i<name.length; i++){
    if(isBlank(name[i].value)){
      alert("Name of product must not be empty");
      flag=true;
    }else if (isBlank(code[i].value)) {
      alert("Product code must not be empty");
      flag=true;
    }
}

if(!flag){
  var decision = confirm("Do you really want to introduce these products?");
  if (decision){
      popupwind = window.open("./popUpWindows/popUpWindow.html", "_blank", "width=800px,height=800px");
  }
}
}

/*
@name= isBlank(param)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if an input is empty or not
  @date = 11-11-2018
  @params= param
  @return = boolean
*/
function isBlank(param){
  return (param =="");
}

/*
@name= isNegative(param)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if a number is negative or not
  @date = 11-11-2018
  @params= param
  @return = boolean
*/
function isNegative(param){
  return (param<=0);
}

/*
@name= validateCode(e,codeType)
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function checks if introduced letters are valid according the type of code introduced before.
  @date = 11-11-2018
  @params= e,codeType
  @return = boolean
*/
function validateCode(e,codeType){

if(codeType=="DNA"){
  letters = "ACGT";
}else{
  letters = "SFLYCWPHQRIMTNKVAEDG";
}
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toUpperCase();

       specials = "8-37-39-46";

       tecla_especial = false
       for(var i in specials){
            if(key == specials[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letters.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
    }

    /*
    @name= showIntro()
      @author= Elisabet M. Aguayo Sedano
      @version= 1.0
      @description= This function selects what divs must be shown
      @date = 11-11-2018
      @params= none
      @return = none
    */
function showIntro(){
  window.parent.document.getElementById("frame").style.display = "block";
  window.parent.document.getElementById("2ndpart").style.display = "none";
}

/*
@name= cancelButton()
  @author= Elisabet M. Aguayo Sedano
  @version= 1.0
  @description= This function goes back to the first page
  @date = 11-11-2018
  @params= none
  @return = none
*/
function cancelButton(){
  window.parent.document.getElementById("frame").style.display = "block";
  window.parent.document.getElementById("2ndpart").style.display = "none";
  window.frames[0].document.getElementById('numberProducts').value="";
}
