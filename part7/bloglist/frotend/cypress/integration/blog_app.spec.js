describe("Blogs app", function() {
    beforeEach( function () {
        cy.request("POST", "http://localhost:3001/api/testing/reset")
        cy.request("POST", "http://localhost:3001/api/users", {
            username: "admin", password: "admin", name:"Administraattor"
        })
        cy.visit('http://localhost:3000')
    })

    it("Login page is shown", function() {
      cy.contains("Log in to application")
      cy.contains("Username:")
      cy.contains("Password:")
    })

    describe("Login", function(){
        it("Succeeds with correct credentials", function() {
            cy.visit("http://localhost:3000")
            cy.get("#username").type("admin")
            cy.get("#password").type("admin")
            cy.get("button").click()
            cy.contains("Administraattor logged in")
        })
        it("Dont success with bad credentials", function() {
            cy.visit("http://localhost:3000")
            cy.get("#username").type("admin")
            cy.get("#password").type("password")
            cy.get("button").click()
            cy.get(".error")
                .should("contain", "Wrong username or password")
                .and("have.css", "color", "rgb(184, 10, 10)")
                .and("have.css", "border-style", "solid")
        })
    })

    describe("When succesfully logged in", function() {
        beforeEach(function(){
            cy.login({username: "admin", password: "admin"})
            cy.visit("http://localhost:3000")
        })
        it("A new blog can be created", function(){
            cy.visit("http://localhost:3000")
            cy.get("#showButton").click()
            cy.get("#title").type("A cool book")
            cy.get("#author").type("Einstein")
            cy.get("#url").type("Google.com")
            cy.get("#submitNewBlog").click()
            cy.contains("A cool book Einstein")
        })

        it("User can like a blog", function() {
            cy.visit("http://localhost:3000")
            cy.addBlog({title: "A cool book", author: "Einstein", url: "google", likes: 0})
            cy.contains("view").parent().find("button").as("theButton")
            cy.get("@theButton").click()
            cy.contains("0")
            cy.contains("Like").parent().find("button").as("likeButton")
            cy.get("@likeButton").click()
            cy.contains("1")
        })

        it("User can delete own blog", function() {
            cy.visit("http://localhost:3000")
            cy.addBlog({title: "A cool book", author: "Einstein", url: "google", likes: 0})
            cy.contains("A cool book Einstein")
            cy.contains("view").parent().find("button").as("theButton")
            cy.get("@theButton").click()
            cy.contains("Delete").parent().find("button").as("deleteButton")
            cy.get("@deleteButton").click()
            cy.on("window:confirm", () => true)
            cy.contains("A cool book Einstein").should("not.exist")
            
        })

        it.only("Blogs are ordered according to likes", function() {
            cy.visit("http://localhost:3000")
            cy.addBlog({title: "A cool book", author: "Einstein", url: "google", likes: 15})
            cy.addBlog({title: "A bad good", author: "Donald Duck", url: "reddit", likes: 0})
            cy.addBlog({title: "A Beatiful book", author: "Mikasa", url: "imgur", likes: 4})
            cy.get("button:contains(view)").click({multiple: true})
            // This is so god damn awful but i just want to go to sleeeeep
            let maxCount = 0
            cy.get(".likes:first").each(like => {
                maxCount = parseFloat(like.text())
            })
            cy.get(".likes").each(like => {
                const count = parseFloat(like.text())
                expect(maxCount).to.be.greaterThan(count - 1)
                maxCount = count
            })
        })
    })
  })