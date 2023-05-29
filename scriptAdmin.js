var blogs = [];


if (!localStorage.Current || JSON.parse(localStorage.Current).UserType!='Admin') {
    $("body").html(`Kindly <a href='HomePage.html'>Login here</a> to see stuff`);
}
if(localStorage.Blogs){
    blogs = JSON.parse(localStorage.Blogs);
}


function IsValidInputs(){
    $('#titleCheck').text("");
    $('#descriptionCheck').text("");
    var isAvailable =blogs.some(bl=>bl.Title==$('#txtTitle').val()) 
    if($('#txtTitle').val()==""|| $('#txtTitle').val().length>20||isAvailable){
        if($('#titleCheck').text("invalid title"));
        return false
    }
    if($('#txtDescription').val()==""){
        $('#descriptionCheck').text("Required");
        return false
    }
    
    return true;
}


function SaveBlog(){
    if(!IsValidInputs()){
        return
    };

    var blog = {'Title':$("#txtTitle").val(),
                'Description':$("#txtDescription").val(),
                'Active':$("#isActive").is(":checked"),
                'Date': $("#date").val(),
                'Comments':[] 
            };
    console.log(blog);
    
    blogs.push(blog);

    localStorage.setItem("Blogs",JSON.stringify(blogs));

    $("#requireInfo").text("");

    ResetForm();

     
}

function ResetForm(){
    $("#txtTitle").val("");
    $("#txtDescription").val("");

};

function ViewBlogs(){
    if(!localStorage.Blogs){
        $("#allBlogs").text("😟No blogs to show");
        return
    }
    var displayBlogs = JSON.parse(localStorage.getItem("Blogs"));
    var text="<ul class='list-group'>";
    for (i of displayBlogs)
    {
        var status="Inactive";
        if(i.Active){
            status="Active";
        }
        text=text+`<li class="list-group-item"><b>${i.Title}</b><p class='m-3'><button type="button" class="btn btn-primary" onclick="GetDetails('${i.Title}')">Get Details</button></p>Status:<p name=${i.Title} class="txtStatus fw-bold">${status}</p><button type="button" class="btn btn-primary" onclick="ChangeStatus('${displayBlogs.indexOf(i)}')">Change Status</button></li>`;
    }
    
    $("#allBlogs").html(text + "</ul>");
}


function ChangeStatus(index){
    var blogArray = JSON.parse(localStorage.getItem("Blogs"));
    blogArray[index].Active=!blogArray[index].Active
    localStorage.Blogs=JSON.stringify(blogArray);
    ViewBlogs();

}

function GetDetails(title){

    current = JSON.parse(localStorage.Current);
    current.CurrentBlog = title;
    localStorage.Current=JSON.stringify(current);
    location.href="BlogPage.html";

}


function LogOut(){
    localStorage.removeItem("Current");
    location.href="index.html";
}
