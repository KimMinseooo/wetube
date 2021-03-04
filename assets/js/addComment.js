import axios from "axios";
const addCommentForm =document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber =document.getElementById("jsCommentNumber");
const deleteBtnArray =document.querySelectorAll("button");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10 ) + 1;
}

const decreaseNumber = () => {
    commentNumber.innerHTML =parseInt(commentNumber.innerHTML, 10) -1 ;
}



const addComment = (comment) => {
    const li = document.createElement("li");
    const span =document.createElement("span");
    span.innerHTML =comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
}

const sendComment = async(comment) => { 
    const videoId =window.location.href.split("/videos/")[1];
    const response =await axios({
        url :`/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if(response.status === 200){
    addComment(comment);
    }
}

const handleSubmit= (event) => {
    // 새로고침 되길 원하지 않음.
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment =commentInput.value;
    sendComment(comment);
    commentInput.value= "";
}

const handleDelete = async(event) => {
    const target =event.currentTarget;
    console.log(target);
    const targetLi = target.parentNode;
    const targetSpan = targetLi.querySelector("span");
    const targetComment = targetSpan.innerText;
    console.log(targetComment);
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url:`/api/${videoId}/delete-comment`,
        method: "POST",
        data: {
            targetComment
        }
    });
    if (response.status === 200) {
        commentList.removeChild(targetLi);
        decreaseNumber();
    }
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
    deleteBtnArray.forEach((element) => {
        element.addEventListener("click", handleDelete);
    });
}

if (addCommentForm) {
    init();
}