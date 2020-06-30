context('DWP API test', () => {
    it('Test - Using API call witout loading the page', () => {
        cy.request("http://bpdts-test-app-v2.herokuapp.com/instructions")
            .then((response) => {
                // response validation
                expect(response).property('status').to.equal(200)
                expect(response).property('body').to.have.property('todo')
            })
        cy.request('http://bpdts-test-app-v2.herokuapp.com/users')
            .should((response) => {
                expect(response.status).to.eq(200)
                // expect(response.body).to.have.property('have.length', 1000)
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')

            })
        cy.request('http://bpdts-test-app-v2.herokuapp.com/user/2')
            .then((response) => {
                // response validation
                expect(response).property('status').to.equal(200)
                expect(response).property('body').to.have.property('id')
                expect(response.body).to.have.property('first_name')
                expect(response.body).to.have.property('last_name')
                expect(response.body).to.have.property("email")
                expect(response.body).to.have.property("ip_address")
                expect(response.body).to.have.property("latitude")
                expect(response.body).to.have.property("longitude")
                expect(response.body).to.have.property("city")
            })
        cy.request('http://bpdts-test-app-v2.herokuapp.com/city/Kundung/users')
            .then((response) => {
                // response validation
                expect(response).property('status').to.equal(200)
            })
    })

    it('Test - Using page and page elements', () => {
        cy.visit('http://bpdts-test-app-v2.herokuapp.com/')
        cy.get('#operations-tag-default').click()

        cy.get('#operations-default-get_users3 > .opblock-summary').click()
        cy.get('.btn').click()

        cy.get('input').type("2")
        cy.get('.execute-wrapper > .btn').click()
        cy.get(':nth-child(1) > .responses-table > tbody > .response > .response-col_status').should('have.text', '200')
    })
})