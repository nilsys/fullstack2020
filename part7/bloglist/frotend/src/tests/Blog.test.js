import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"

import Blog from "../components/Blog"
import CreateBlog from "../components/CreateBlog"

const mockData = {
    "blog": {
        "title": "Story of authorization",
        "author": "Borsas",
        "url": "https://google.com",
        "likes": 1338,
        "user": {
        "username": "borsas",
        "name": "Oskari",
        "id": "5efa2f31bb44f038d1d0a9d6"
        },
        "id": "5efa3fa3fb2fe95e5bd2b896"
    },
    "user" :{
        "username": "borsas",
        "name": "Oskari"
    }
}

describe("<Blog/> renders correctly", () => {
    test("Renders title and author but nothing else", () => {
        
        const component = render(
            <Blog blog={mockData.blog} user={mockData.user}/>
        )
        expect(component.container).toHaveTextContent(
            "Story of authorization Borsas"
        )
        expect(component.container.querySelector(".blogDetails")).not.toBeVisible()
    })

    test("Click button shows url and likes", () => {
        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={mockData.blog} user={mockData.user} handleShowBlog={mockHandler}/>
        )
        const button = component.getByText("view")
        const div = component.container.querySelector(".blogDetails")
        
        expect(div).not.toBeVisible()

        fireEvent.click(button)

        expect(div).toBeVisible()
        expect(div).toHaveTextContent(
            "https://google.com1338LikeBorsasDelete"
        )
    })

    test("Like button receives 2 clicks", () => {
        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={mockData.blog} user={mockData.user} handleNewLike={mockHandler}/>
        )
        const button = component.getByText("Like")
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})

describe("<CreateBlog/>", () =>{
    test("New Blog form works correctly", () => {
        const createNewBlog = jest.fn()

        const component = render(
            <CreateBlog createNewBlog={createNewBlog}/>
        )

        const title = component.container.querySelector("#title")
        const author = component.container.querySelector("#author")
        const url = component.container.querySelector("#url")
        const form = component.container.querySelector("form")

        fireEvent.change(title, { 
            target: { value: 'Book' } 
        })
        fireEvent.change(author, { 
            target: { value: 'Borsas' } 
        })
        fireEvent.change(url, { 
            target: { value: 'google.com' } 
        })
        
        fireEvent.submit(form)
        component.debug()
        expect(createNewBlog.mock.calls).toHaveLength(1)
        expect(createNewBlog.mock.calls[0][0].title).toBe("Book")
        expect(createNewBlog.mock.calls[0][0].author).toBe("Borsas")
        expect(createNewBlog.mock.calls[0][0].url).toBe("google.com")
        
    })
})