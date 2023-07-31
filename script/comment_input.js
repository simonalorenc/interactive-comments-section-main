import {renderComment} from "./comments.js";
import {commentsSection, currentUser, comments, storedComments} from "./main.js";

export function renderCommentInput(parent, commentParent, hasReplies) {
    const inputContainer = document.createElement('div')
    inputContainer.classList.add('new-comment')
    parent.appendChild(inputContainer)

    const logoElement = document.createElement('img')
    logoElement.classList.add('new-comment__logo')
    logoElement.src = currentUser.image.png
    inputContainer.appendChild(logoElement)

    const textInput = document.createElement('textarea')
    textInput.setAttribute('placeholder', 'Add a comment...')
    textInput.classList.add('new-comment__text')
    inputContainer.appendChild(textInput)

    const submitInput = document.createElement('input')
    submitInput.setAttribute('type', 'submit')
    submitInput.classList.add('new-comment__submit')
    submitInput.value = 'SEND'
    submitInput.addEventListener('click', () => {
        const comment = createComment(textInput.value, hasReplies)
        renderComment(commentParent, comment)
        textInput.value = ''
        storedComments.push(comment)
        localStorage.setItem('comments', JSON.stringify(storedComments))
    })
    inputContainer.appendChild(submitInput)
}

function createComment(content, hasReplies) {
    if (hasReplies) {
        return {
            content: content,
            createdAt: "today",
            score: 0,
            user: {
                image: currentUser.image,
                username: currentUser.username
            },
            replies: []
        }
    } else {
        return {
            content: content,
            createdAt: "today",
            score: 0,
            user: {
                image: currentUser.image,
                username: currentUser.username
            }
        }
    }
}