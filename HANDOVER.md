# TableCheck SWE (js focus) takehome


## Task completion

### Completed tasks
- Task (1), (2) and (3) has been fixed.
- I had to fix some errors in test case while working on the task (2) and (3)
- In the cypress/e2e/e2e.spec.ts test cases some cy.mock need to pass "/shops/{id}" and "/shops/{id}/menu", when it try to get value from client object in client.generated.ts its throwing an error. I have fixed it adding "/shops/{id}" and "/shops/{id}/menu" end points on openapi/spec.json
- also in the cypress/e2e/e2e.spec.ts test case for "should respect min max order qty for group orders" inside the draft it push client["get /shops/:shop/menu 200"]((item) => {...}) but its throwing Error Immer only supports setting array indices and the 'length' property, because it is trying to modify the array inside the Immer's produce function, to fix this I have to return modified object directly.
- also in my understanding the screen when Menu has multiple data get from API it should loop all menu items, so I have to create a design where if 5 items are in the menu it will show the person selection in 5 times in a loop.
As the tag for ADULTS, SENIORS, CHILD and BABIES are same but now showing same design multiple time so to achieve this I need to change the code so the buttons able to click multiple times in CY test cases. Now in all menu items the increment and decrement button can press simultaneously same time.


### Incomplete tasks
#### Task (4) has not completed
But After doing some research on react, I think I have some perspective I can share with you.
- I think its better to use react lazy loading and suspense fall back for rendering component.
- I think I will use the state management based on the complexity of the application If the application has not much state the I will use Context api and if the application is complex I would like to use Redux.
- I think I will use Apollo Client for api calling and cache the response those are not change frequently.

### Some screenshots of the task
#### When there is no menu
![image](https://github.com/kazikhaledsaif/tc-js-focus-takehome/assets/21054907/1b9bc252-dbc5-4846-ba0a-806d8a4122f7)

#### When there is two menu
![image](https://github.com/kazikhaledsaif/tc-js-focus-takehome/assets/21054907/8e0340b0-53a5-49b9-b389-24f6338d7904)
