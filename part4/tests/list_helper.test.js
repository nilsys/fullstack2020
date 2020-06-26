const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe("Most Likes", () => {
      blogs = [
          {
              title: "1",
              author: "1",
              likes: 10
          },
          {
              title: "2",
              author: "2",
              likes: 1
          },
          {
              title: "3",
              author: "3",
              likes: 5
          },
          {
            title: "4",
            author: "4",
            likes: 13
        }
      ]
    test("Get the blog with the most likes", () => {
        const result = listHelper.favoriteBlog(blogs)
        const favorite = {
            title: "4",
            author: "4",
            likes: 13
        }
        expect(result).toEqual(favorite)
    })
  })