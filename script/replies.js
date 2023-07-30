import {renderComment} from "./comments.js";
import {currentUser, comments} from "./main.js";

export function renderReplies(parent, replies) {
    const repliesContainer = document.createElement('div')
    repliesContainer.classList.add('comments__reply-container-shift')
    parent.appendChild(repliesContainer)

    replies.forEach(reply => {
        renderComment(repliesContainer, reply, currentUser)
    })
}