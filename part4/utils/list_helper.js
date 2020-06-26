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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}