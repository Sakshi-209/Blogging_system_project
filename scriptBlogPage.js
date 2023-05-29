if (!localStorage.Current) {
    $("#welcomeText").html(`Kindly <a href='index.html'>Login here</a> to see stuff`);
}
if(JSON.parse(localStorage.Current).CurrentBlog==""){
    $("#welcomeText").html(`Kindly Select a blog to view from previous page`);
}

var current = JSON.parse(localStorage.Current);
console.log(current);

if (current.UserType =='User') {
    welcomeText();
    UserAccess();
}

if (current.UserType == 'Admin') {
    welcomeText();
    AdminAcess();
}


function welcomeText() {
    $("#welcomeText").text("Welcome " + current.Name);

}

function AdminAcess() {

    var blogs = JSON.parse(localStorage.getItem("Blogs"));
    var detailedBlog = blogs.find(bl => bl.Title == current.CurrentBlog);
    var details = `<ul class='list-group'><li class="list-group-item"><p>Title:<b>${detailedBlog.Title}</b></p>Discription:<p class='m-3'>${detailedBlog.Description}</p>Date Published<p class='m-3'>${detailedBlog.Date}</p></li></ul>`;
    var commentTable = "<thead><td>user</td><td>Date</td><td>Comment</td><td>Status</td></thead><tbody>"
    for (i of detailedBlog.Comments) {
        commentTable += `<tr><td>${i.User}</td><td>${i.DateTime}</td><td>${i.text}</td><td>${i.Status}`
        if(i.Status=="notApproved") 
        {    console.log(i.Status);
            commentTable+=`<button class="btn btn-primary m-3" onclick="AcceptComment('${i.User}','${i.DateTime}')">Approve</button></td></tr>`
        }
    }
    $("#details").html(details);
    $("#commentTable").html(commentTable + "</tbody>");


}

function UserAccess() {
    var blogs = JSON.parse(localStorage.getItem("Blogs"));
    var detailedBlog = blogs.find(bl => bl.Title == current.CurrentBlog);
    var details = `<ul class='list-group'><li class="list-group-item"><p>Title:<b>${detailedBlog.Title}</b></p>Discription:<p class='m-3'>${detailedBlog.Description}</p>Date Published<p class='m-3'>${detailedBlog.Date}</p></li></ul>`;
    var commentTable = "<thead><td>user</td>><td>Date</td><td>Comment</td></thead><tbody>"
    console.log(detailedBlog.Comments);
    for (i of detailedBlog.Comments) {
        if (i.Status == "notApproved") {
            $("#details").html(details);
            continue;
        }
        commentTable += `<tr><td>${i.User}</td><td>${i.DateTime}</td><td>${i.text}</td></tr>`
    }
    $("#details").html(details);
    $("#commentTable").html(commentTable + "</tbody>");
    $("#addComment").html(`<textarea id="txtComment"></textarea><button class="btn btn-primary m-3" onclick="AddComment()">ADD COMMENT</button>`)

}
function AddComment() {
   
    var blogs = JSON.parse(localStorage.getItem("Blogs"));
    var detailedBlog = blogs.find(bl => bl.Title == current.CurrentBlog);
    if ($("#txtComment").val() == "") {
        alert("kindly add valid comment");
        return
    }
    var newComment = {
        'User': current.Email,
        'DateTime': new Date(),
        'text': $("#txtComment").val(),
        'Status': "notApproved"

    }
    i =  blogs.indexOf(detailedBlog);
    detailedBlog.Comments.push(newComment);
    blogs[i] = detailedBlog;
    localStorage.Blogs = JSON.stringify(blogs);
   
    alert("Comment sent for approval")

}
function AcceptComment(emai, time){
    var blogs = JSON.parse(localStorage.getItem("Blogs"));
    var detailedBlog = blogs.find(bl => bl.Title == current.CurrentBlog);
    i =  blogs.indexOf(detailedBlog);
    
    var comment=detailedBlog.Comments.find(c=>c.User==emai&&c.DateTime==time);
    j = detailedBlog.Comments.indexOf(comment);
    comment.Status="Approved";
    detailedBlog.Comments[j]=comment;
     blogs[i] = detailedBlog;
     localStorage.Blogs = JSON.stringify(blogs);
     AdminAcess();
    
 }
$("#btnBack").click(function (){
    delete current.CurrentBlog;
    localStorage.Current=JSON.stringify(current);
    if(current.UserType=='Admin'){
        location.href="AdminPage.html";
        return
    }
        location.href="index.html";
})