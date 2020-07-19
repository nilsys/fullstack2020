const _ = require("lodash")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(element => {
        likes = likes + element.likes
    });
    return likes
}

const favoriteBlog = (blogs) => {

    return blogs.find(blog => {
        return blog.likes === Math.max.apply(Math, blogs.map(blog => blog.likes))
    })
}

// Help me
const mostBlogs = (blogs) => {
    let res = {}
    blogs.forEach(v => {
        res[v.author] = (res[v.author] || 0) +1
    })
    const author = Object.keys(res).reduce((a, b) => { return res[a] > res[b] ? a : b })
    return {
        "author": author,
        "blogs": res[author]
    }
}   

const mostLikes = (blogs) => {
    let authors = []
    blogs.forEach(a => {
        authors[a.author] = (authors[a.author] || 0) + a.likes
    })
    const author = Object.keys(authors).reduce((a, b) => { return authors[a] > authors[b] ? a : b })
    return {
        "author": author,
        "likes": authors[author]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}