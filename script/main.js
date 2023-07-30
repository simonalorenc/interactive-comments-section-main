import {renderCommentInput} from "./comment_input.js";
import {renderComments} from "./comments.js";

export let currentUser
export let comments

export let commentsSection
export let commentInputSection

async function main() {
    const jsonResponse = await fetch("./data/data.json")
    const data = await jsonResponse.json()
    currentUser = data.currentUser
    comments = data.comments

    commentsSection = document.querySelector('.comments-section')
    commentInputSection = document.querySelector('.comment-input-section')

    renderComments()
    renderCommentInput(commentInputSection, commentsSection, true)
}

main()