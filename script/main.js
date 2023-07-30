import {renderCommentInput} from "./comment_input.js";
import {renderComment, renderComments} from "./comments.js";

export let currentUser
export let comments

export let commentsSection
export let commentInputSection

export let storedComments

async function main() {
    const jsonResponse = await fetch("./data/data.json")
    const data = await jsonResponse.json()
    currentUser = data.currentUser
    comments = data.comments

    const currentStoredComments = localStorage.getItem('comments')
    if (currentStoredComments == null) {
        storedComments = []
    } else {
        storedComments = JSON.parse(currentStoredComments)
    }
    console.log(storedComments)

    commentsSection = document.querySelector('.comments-section')
    commentInputSection = document.querySelector('.comment-input-section')

    renderComments()
    renderSavedComments()
    renderCommentInput(commentInputSection, commentsSection, true)    
}

function renderSavedComments() {
    storedComments.forEach(comment => {
        renderComment(commentsSection, comment)
    });
}

main()