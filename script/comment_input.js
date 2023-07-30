import {renderComment} from "./comments.js";
import {commentsSection, currentUser, comments} from "./main.js";

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
    let storedComments = []
    submitInput.addEventListener('click', () => {
        const comment = createComment(textInput.value, hasReplies)
        const newComment = renderComment(commentParent, comment)
        storedComments.push(newComment)
        console.log(storedComments)
        textInput.value = ''

        const commentsData = Array.from(storedComments).map(oneComment => oneComment.outerHTML)
        localStorage.setItem('comments', JSON.stringify(commentsData))
    })
    inputContainer.appendChild(submitInput)

    const addedComments = localStorage.getItem('comments')
    if (addedComments) {
        const commentsData = JSON.parse(addedComments)
        commentsData.forEach(commentData => {
            const commentElement = document.createElement('div')
            commentElement.classList.add('comment__with-replies')
            commentElement.innerHTML = commentData
            commentsSection.appendChild(commentElement)
        })
    }
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