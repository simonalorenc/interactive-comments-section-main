import {renderReplies} from "./replies.js";
import {renderCommentInput} from "./comment_input.js";
import {comments, commentsSection, currentUser} from "./main.js";

export function renderComments() {
    comments.forEach(comment => {
        renderComment(commentsSection, comment)
    })
}

export function renderComment(parent, comment) {
    const isComment = comment.hasOwnProperty('replies')

    const commentWithReplies = document.createElement('div')
    commentWithReplies.classList.add('comment__with-replies')
    parent.appendChild(commentWithReplies)

    const commentContainer = document.createElement('div')
    commentContainer.classList.add('comment')
    commentWithReplies.appendChild(commentContainer)

    renderScore(commentContainer, comment.score)

    renderCommentContent(commentContainer, comment, () => {
        if (isComment) {
            renderCommentInput(commentWithReplies, commentWithReplies.querySelector('.comments__reply-container-shift'), true)
        } else {
            renderCommentInput(commentWithReplies, commentWithReplies, false)
        }
    })

    if (isComment) {
        renderReplies(commentWithReplies, comment.replies)
    }
}

function renderScore(parent, score) {
    const scoreContainer = document.createElement('div')
    scoreContainer.classList.add('comment__like')
    parent.appendChild(scoreContainer)

    const plusElement = document.createElement('img')
    plusElement.src = './images/icon-plus.svg'
    scoreContainer.appendChild(plusElement)

    const commentLikeNumber = document.createElement('div')
    commentLikeNumber.classList.add('comment__like-number')
    commentLikeNumber.textContent = score
    scoreContainer.appendChild(commentLikeNumber)

    const minusElement = document.createElement('img')
    minusElement.src = './images/icon-minus.svg'
    scoreContainer.appendChild(minusElement)
}

function renderCommentContent(parent, comment, onReplyClick) {
    const commentContent = document.createElement('div')
    commentContent.classList.add('comment__content')
    parent.appendChild(commentContent)

    renderCommentHeader(commentContent, comment, onReplyClick)

    const commentTextElement = document.createElement('div')
    commentTextElement.textContent = comment.content
    commentTextElement.classList.add('comment__text')
    commentContent.appendChild(commentTextElement)

    const repliesParentContainer = document.createElement('div')
    repliesParentContainer.classList.add('comments__reply-container-shift')
}

function renderCommentHeader(parent, comment, onReplyClick) {
    const commentHeader = document.createElement('div')
    commentHeader.classList.add('comment__info')
    parent.appendChild(commentHeader)

    const commentInfo = document.createElement('div')
    commentInfo.classList.add('comment__basic-info')
    commentHeader.appendChild(commentInfo)

    const imgContainer= document.createElement('div')
    imgContainer.classList.add('comment__basic-info-logo')
    const imgElement = document.createElement('img')
    imgElement.src = comment.user.image.png
    imgContainer.appendChild(imgElement)
    commentInfo.appendChild(imgContainer)

    const nameElement = document.createElement('div')
    nameElement.classList.add('comment__basic-info-name')
    nameElement.textContent = comment.user.username
    commentInfo.appendChild(nameElement)

    const timeElement = document.createElement('div')
    timeElement.textContent = comment.createdAt
    timeElement.classList.add('comment__basic-info-time')
    commentInfo.appendChild(timeElement)

    const replyElement = document.createElement('div')
    replyElement.classList.add('comment__info-reply')
    // replyElement.setAttribute('data-reply-added', 'false')
    replyElement.addEventListener('click', onReplyClick)
    commentHeader.appendChild(replyElement)

    const replyImg = document.createElement('img')
    replyImg.src = './images/icon-reply.svg'
    replyElement.appendChild(replyImg)
    const replyText = document.createElement('div')
    replyText.classList.add('comment__info-reply-text')
    replyText.textContent = 'Reply'
    replyElement.appendChild(replyText)
}