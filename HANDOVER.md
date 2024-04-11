# TableCheck SWE (js focus) takehome

## Task completion

### Completed tasks
- Task (1), (2) and (3) has been fixed.
- I had to fix some errors in test case while working on the task (2) and (3)
- In the cypress/e2e/e2e.spec.ts test cases some cy.mock need to pass "/shops/{id}" and "/shops/{id}/menu", when it try to get value from client object in client.generated.ts its throwing an error. I have fixed it adding "/shops/{id}" and "/shops/{id}/menu" end points on openapi/spec.json
- also in the cypress/e2e/e2e.spec.ts test case for "should respect min max order qty for group orders" inside the draft it push client["get /shops/:shop/menu 200"]((item) => {...}) but its throwing Error Immer only supports setting array indices and the 'length' property, because it is trying to modify the array inside the Immer's produce function, to fix this I have to return modified object directly.



### Incomplete tasks
#### Task (4) has not completed
But After doing some research on react, I think I have some perspective I can share with you.
- I think its better to use react lazy loading and suspense fall back for rendering component.
- I think I will use the state management based on the complexity of the application If the application has not much state the I will use Context api and if the application is complex I would like to use Redux.
- I think I will use Apollo Client for api calling and cache the response those are not change frequently.