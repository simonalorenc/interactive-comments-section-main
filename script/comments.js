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

    if (comment.user.username === currentUser.username) {
        const nameElements = document.querySelectorAll('.comment__basic-info-name')
        nameElements.forEach(nameElement => {
            if (nameElement.textContent === currentUser.username) {
                createUserSymbol(nameElement)
                renderDeleteElement(nameElement.parentNode.parentNode)
                renderEditElement(nameElement.parentNode.parentNode)
            }
        }) 
    }
    return commentContainer
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

function createUserSymbol(nameElement) {
    const currentUserSymbol = document.createElement('div')
    currentUserSymbol.classList.add('current-user-symbol')
    currentUserSymbol.innerHTML = 'YOU'
    nameElement.appendChild(currentUserSymbol)
    const nameParent = nameElement.parentNode
    const infoElement = nameParent.parentNode 
    const replyElement = infoElement.children[1]
    infoElement.removeChild(replyElement)
}

function renderDeleteElement(infoElement) {
    const deleteElement = document.createElement('div')
    deleteElement.classList.add('delete')
    const deleteImg = document.createElement('img')
    deleteImg.src = './images/icon-delete.svg'
    deleteElement.appendChild(deleteImg)
    const deleteText = document.createElement('p')
    deleteText.classList.add('delete__text')
    deleteText.textContent = 'Delete'
    deleteElement.appendChild(deleteText)
    infoElement.appendChild(deleteElement)
        deleteElement.addEventListener('click', () => {
            const commentContent = infoElement.parentNode
            const commentToDelete = commentContent.parentNode
            commentToDelete.parentNode.removeChild(commentToDelete)
        })
}

function renderEditElement(infoElement) {
    const editElement = document.createElement('div')
    editElement.classList.add('edit')
    const editImg = document.createElement('img')
    editImg.src = './images/icon-edit.svg'
    editElement.appendChild(editImg)
    const editText = document.createElement('p')
    editText.classList.add('edit__text')
    editText.textContent = 'Edit'
    editElement.appendChild(editText)
    infoElement.appendChild(editElement)
        editElement.addEventListener('click', () => {
            const commentContent = infoElement.parentNode
            const commentText = commentContent.children[1]
            const comment = commentContent.parentNode
            renderCommentInput(comment.parentNode, comment.parentNode, false) 
            const textInput = document.querySelector('.new-comment__text')
            textInput.value = commentText.textContent
            comment.parentNode.removeChild(comment)
            const newComment = document.querySelector('.new-comment')
            const newCommentSubmits = document.querySelectorAll('.new-comment__submit')
            newCommentSubmits.forEach(newCommentSubmit => newCommentSubmit.addEventListener('click', () => {
                newComment.parentNode.removeChild(newComment)
            }))
        })
}