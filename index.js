var users = [];
displayBlogs=[];
if(localStorage.Blogs){
var displayBlogs = JSON.parse(localStorage.getItem("Blogs")).filter(bl=>bl.Active==true);}


var passwReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/;
var nameReg=/[a-zA-Z]$/;
var emailReg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



// Setting Up Admin
if(!localStorage.Users){
    var admin = {'Name':"Admin","Email":"admin@enest.com","Password":"1",'UserType':'Admin'};
    users.push(admin);
    localStorage.setItem("Users",JSON.stringify(users));

}
users=JSON.parse(localStorage.Users);

// DISPLAYING THE BLOG TITLES

$(document).ready(function(){
    if(displayBlogs.length==0){
        return
    }
    
    var text="<ul class='list-group'>";
    for (i of displayBlogs)
    {
            text=text+`<li class="list-group-item"><p>Title :</p><b>${i.Title}</b><p class='m-3'><button type="button" class="btn btn-primary" onclick="GetDetails('${i.Title}')">Get Details</button></p></li>`;
        
    }
    
    $("#allBlogs").html(text + "</ul>");
})


if(localStorage.Current && JSON.parse(localStorage.Current).UserType=="User"){
    console.log(1)
    $("#loginOrRegister").hide();
    $("#userWelcomeText").text(`Welcome ${JSON.parse(localStorage.Current).Name}`);
    $("#btnLogOut").html("<button class='btn btn-primary' onclick='LogOut()'>Log Out</button>")

}



function GetDetails(item){
    if(!localStorage.Current||!(JSON.parse(localStorage.Current).UserType=='User')){
        alert("Kindly Login to view Full Blogs")
        return
    }
    var currentUser= JSON.parse(localStorage.Current);
    currentUser.CurrentBlog = item
    localStorage.setItem("Current",JSON.stringify(currentUser));
    location.href="BlogPage.html"
    
    
}


function Save(){



    if (!IsFormValid()) {
        $("#requireInfo").text("Please fill Required columns");
        return
    }
    var user = {
        'Name': $("#txtFirstName").val() + " " + $("#txtLastName").val(),
       'Email': $("#txtEmail").val() ,
       'Password': $("#txtPassword").val(),   
       'UserType': 'User'
    };
    

    users.push(user);


    var a = JSON.stringify(users);


    localStorage.Users=a;



    $("requireInfo").text("");

    ResetForm();

}


function ResetForm(){

    $("requireInfo").text("");
    $("#nameCheck").text("");
    $("#passwordCheck").text("");
    $("#emailCheck").text("");

    $("#txtFirstName").val("");
    $("#txtLastName").val("");
    $("#txtPassword").val("");
    $("#txtEmail").val("");


}

function IsValidName() {
    if (nameReg.test($("#txtFirstName").val())) {
        $("#nameCheck").text("");
        return true;
    }
    
    $("#nameCheck").text("Name not Valid");
    return false;
}

function IsValidPassword() {
    
    if (passwReg.test($("#txtPassword").val())) {
        $("#passwordCheck").text("");
        return true;
    }
    
    $("#passwordCheck").text("Enter Valid Password");
    return false;
}

function IsValidEmail() {
    isNotAvailable=users.some(em=>em.Email==$("#txtEmail").val());
    if (emailReg.test($("#txtEmail").val()) && !isNotAvailable) {
        $("#emailCheck").text("");
        return true;
    }
  
    $("#emailCheck").text("Email not Valid");
    return false;
}


    function IsFormValid() {
        return IsValidName() && IsValidEmail()&&IsValidPassword();
    }


    function CheckEmailInArray(obj){
        return obj.Email==$('#txtLoginEmail').val() ||obj.Email==$('#txtEmail').val();
    
    }

    
    function Login() {

    
        usernameTest = users.find(CheckEmailInArray);
        
    
        if (usernameTest == undefined || usernameTest==null) {
            $("#txtUserInc").text("User not correct");
            return;
        }
    
        if (!(usernameTest.Password == $("#txtLoginPass").val())) {
            $("#txtUserInc").text("Password not correct");
            return;
        }

        var currentUser=usernameTest;
        localStorage.Current=JSON.stringify(currentUser);

        if(usernameTest.UserType=='Admin'){
            location.href="AdminPage.html";
            LoginReset();
            return
        }
    
        $("#txtUserInc").text("");
        $("#exampleModalToggle2").modal('hide');
        $("#loginOrRegister").hide();
        $("#userWelcomeText").text(`Welcome ${currentUser.Name}`);
        $("#btnLogOut").html("<button class='btn btn-primary' onclick='LogOut()'>Log Out</button>")

        LoginReset();

    
    }
    
    function LoginReset() {
        $("#txtLoginPass").text("");
        $("#txtLoginUsername").text("");
    }

    function LogOut(){
        localStorage.removeItem("Current");
        location.reload();
    }



