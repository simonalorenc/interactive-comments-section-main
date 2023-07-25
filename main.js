const commentsContainer = document.querySelector('.all-comments')
const addCommentContainer = document.querySelector('.add-comment')

function getData() {
    return fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        createCurrentUserELement()
        if (Array.isArray(data.comments)) {
            data.comments.forEach(comment => {
                const commentElement = createCommentElement(comment);
                const commentsContainer = document.querySelector('.all-comments')
                const commentElementWithReplies = document.createElement('div')
                commentElementWithReplies.classList.add('comment__with-replies')
                commentElementWithReplies.append(commentElement)
                commentsContainer.append(commentElementWithReplies);
                if (Array.isArray(comment.replies)) {
                    const replyContainer = document.createElement('div')
                    replyContainer.classList.add('comments__reply-container')
                    commentElementWithReplies.appendChild(replyContainer)
                    if (comment.replies !== 0) {
                        comment.replies.forEach(reply => {
                            const replyContainerNext = document.createElement('div')
                            replyContainerNext.classList.add('comments__reply-container-next')
                            const replyElement = createCommentElement(reply)
                            replyContainerNext.append(replyElement)
                            replyContainer.append(replyContainerNext)
                            const replyContainerForReplies = document.createElement('div')
                            replyContainerForReplies.classList.add('comments__reply-container')
                            replyContainerNext.append(replyContainerForReplies)
                        })
                    } 
                }
            })
        }
    })
    .catch(error => {
        console.error('Error: ', error)
    })
}

function createCommentElement(comment) {

    const commentElement = document.createElement('div')
    commentElement.classList.add('comment')

    const commentLike = document.createElement('div')
    commentLike.classList.add('comment__like')
    const plusElement = document.createElement('img')
    plusElement.src = './images/icon-plus.svg'
    commentLike.appendChild(plusElement)
    const commentLikeNumber = document.createElement('div')
    commentLikeNumber.classList.add('comment__like-number')
    commentLikeNumber.textContent = comment.score
    commentLike.appendChild(commentLikeNumber)
    const minusElement = document.createElement('img')
    minusElement.src = './images/icon-minus.svg'
    commentLike.appendChild(minusElement)

    const commentContent = document.createElement('div')
    commentContent.classList.add('comment__content')

    const infoElement = document.createElement('div')
    infoElement.classList.add('comment__info')
    commentContent.appendChild(infoElement)

    const commentInfoElement = document.createElement('div')
    commentInfoElement.classList.add('comment__basic-info')
    infoElement.appendChild(commentInfoElement)

    const imgContainer= document.createElement('div')
    imgContainer.classList.add('comment__basic-info-logo')
    const imgElement = document.createElement('img')
    imgElement.src = comment.user.image.png
    imgContainer.appendChild(imgElement)
    const nameElement = document.createElement('div')
    nameElement.classList.add('comment__basic-info-name')
    nameElement.textContent = comment.user.username
    const timeElement = document.createElement('div')
    timeElement.textContent = comment.createdAt
    timeElement.classList.add('comment__basic-info-time')
    commentInfoElement.appendChild(imgContainer)
    commentInfoElement.appendChild(nameElement)
    commentInfoElement.appendChild(timeElement)

    commentElement.appendChild(commentLike)
    commentElement.appendChild(commentContent)

    const commentReplyElement = document.createElement('div')
    commentReplyElement.classList.add('comment__info-reply')
    commentReplyElement.setAttribute('data-reply-added', 'false')
    infoElement.appendChild(commentReplyElement)
    const replyImg = document.createElement('img')
    replyImg.src = './images/icon-reply.svg'
    commentReplyElement.appendChild(replyImg)
    const replyText = document.createElement('div')
    replyText.classList.add('comment__info-reply-text')
    replyText.textContent = 'Reply'
    commentReplyElement.appendChild(replyText)
    
    const commentTextElement = document.createElement('div')
    commentTextElement.textContent = comment.content
    commentTextElement.classList.add('comment__text')
    commentContent.appendChild(commentTextElement)

    return commentElement
}

function createCurrentUserELement() {

    const newCommentElement = document.createElement('div')
    newCommentElement.classList.add('new-comment')
    addCommentContainer.appendChild(newCommentElement)

    const logoElement = document.createElement('img')
    logoElement.classList.add('new-comment__logo')
    logoElement.src = './images/avatars/image-juliusomo.png'
    newCommentElement.appendChild(logoElement)

    const textInput = document.createElement('textarea')
    textInput.setAttribute('placeholder', 'Add a comment...')
    textInput.classList.add('new-comment__text')
    newCommentElement.appendChild(textInput)

    const submitInput = document.createElement('input')
    submitInput.setAttribute('type', 'submit')
    submitInput.classList.add('new-comment__submit')
    submitInput.value = 'SEND'
    newCommentElement.appendChild(submitInput)

    return newCommentElement
}

function addReply() {
    const replyBtn = document.querySelectorAll('.comment__info-reply')
    replyBtn.forEach((replyComment, index) => replyComment.addEventListener('click', () => {
        const replyAdded = replyComment.getAttribute('data-reply-added');
        if (replyAdded === 'true') {
            return;
        }
        replyComment.setAttribute('data-reply-added', 'true')
        const replyContainers = document.querySelectorAll('.comments__reply-container')
        console.log(replyContainers)
        const currentReply = createCurrentUserELement()
        const targetReplyContainer = replyContainers[index]
        targetReplyContainer.appendChild(currentReply)
        const submitInput = document.querySelector('.new-comment__submit')
        submitInput.value = 'REPLY'
    }))
}

async function asyncTest() {
    await getData()
    addReply()
    
}

asyncTest()
