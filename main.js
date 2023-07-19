const commentsContainer = document.querySelector('.all-comments');

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data.comments)) {
            data.comments.forEach(comment => {
              const commentElement = createCommentElement(comment);
              const commentsContainer = document.querySelector('.all-comments')
              const commentElementWithReplies = document.createElement('div')
              commentElementWithReplies.classList.add('comment__with-replies')
              console.log(commentElementWithReplies)
              commentElementWithReplies.append(commentElement)
              commentsContainer.append(commentElementWithReplies);
              console.log(comment.replies)
              if (Array.isArray(comment.replies)) {
                if (comment.replies !== 0) {
                    comment.replies.forEach(reply => {
                        console.log(comment.replies.length)
                        
                        const replyContainer = document.createElement('div')
                        replyContainer.classList.add('comments__reply-container')
                        commentElementWithReplies.appendChild(replyContainer)

                        const replyElement = createCommentElement(reply)
                        
                        console.log(replyContainer)
                        replyContainer.append(reply)
                        replyContainer.append(replyElement)
                    })
                  }
              }
              
            })
        }
    })
    .catch(error => {
        console.error('Error: ', error)
    })

function createCommentElement(comment) {

    const commentElement = document.createElement('div')
    commentElement.classList.add('comment')

    const commentLike = document.createElement('div')
    commentLike.classList.add('comment__like')
    const plusElement = document.createElement('img')
    plusElement.src = './images/icon-plus.svg'
    commentLike.appendChild(plusElement)
    const commentLikeNumber = document.createElement('div')
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
    infoElement.appendChild(commentReplyElement)
    const replyImg = document.createElement('img')
    replyImg.src = './images/icon-reply.svg'
    commentReplyElement.appendChild(replyImg)
    const replyText = document.createElement('div')
    replyText.textContent = 'Reply'
    commentReplyElement.appendChild(replyText)
    
    const commentTextElement = document.createElement('div')
    commentTextElement.textContent = comment.content
    commentTextElement.classList.add('comment__text')
    commentContent.appendChild(commentTextElement)

    return commentElement
}


createCommentElement()
