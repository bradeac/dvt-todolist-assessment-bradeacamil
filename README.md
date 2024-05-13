# TODO list app

Automated tests status: [![GitHub Actions Test Run](https://github.com/bradeac/dvt-todolist-assessment-bradeacamil/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/bradeac/dvt-todolist-assessment-bradeacamil/actions/workflows/main.yml)

## Run locally

- `npm i`
- `npm run dev`

## Features

The TODO app starts with an empty list of TODOs.

You can add as many TODOs as you want. Each TODO can be clicked in order to be marked as done and also each TODO can be deleted.

TODOs aren't stored when the windows is closed.

There is a built-in light theme and dark theme which cannot be switched manually, it's set based on what theme preference you have inside your OS settings.

## Tech stack

- Vite (to scaffold the project)
- React
- Typescript
- Redux-Toolkit
- TailwindCSS
- React Testing Library

## Folder structure

I went with the best-practice recommended in the Redux docs. Have a `feature` folder where you have a folder for each feature of the app, each feature being represented by a Redux slice. In this particular case, it might be a bit overkill, but on the other hand, it's quite easy to extend this TODO list app and add other features to it because of this folder structure.

┣ src  
┃ ┣ app  
┃ ┃ ┣ `App.css` - containing some general styles applied to the whole app  
┃ ┃ ┗ `App.tsx` - rendering the `main` element, containing the app header, add TODO form, and TODO list  
┃ ┃ ┗ `store.ts` - containing the Redux store  
┃ ┣ components - contains dumb UI components  
┃ ┃ ┣ `AddTodoForm.tsx` - renders the UI part of the form used to add TODOs  
┃ ┃ ┣ `TodoItem.tsx` - renders a TODO item  
┃ ┃ ┗ `TodoList.tsx` - renders a list of `TodoItem`s  
┃ ┣ features  
┃ ┃ ┗ todos - contains the Redux slice used to store TODOs and Redux-connected components  
┃ ┃ ┃ ┣ `ConnectedAddTodoForm.tsx` - Redux-connected component containing the interactivity logic for adding a TODO. It renders the dumb `AddTodoForm` component and adding to it interactivity and a link to the Redux store  
┃ ┃ ┃ ┣ `ConnectedTodoList.tsx` - Redux-connected component that renders the dumb `TodoList` component  
┃ ┃ ┗ ┗ `todoListSlice.tsx` - Contains the reducers and an interface represnting the shape of the state stored by Redux  
┃ ┣ test  
┃ ┃ ┣ components  
┃ ┃ ┃ ┣ `AddTodoForm.test.tsx` - Contains automated tests for the `AddTodoForm` dumb component  
┃ ┃ ┃ ┣ `ConnectedAddTodoForm.test.tsx` - Contains automated tests for the `ConnectedAddTodoForm` component  
┃ ┃ ┃ ┣ `ConnectedTodoList.test.tsx` - Contains automated tests for the `ConnectedTodoList` component  
┃ ┃ ┃ ┣ `TodoItem.test.tsx` - Contains automated tests for the `TodoItem` dumb component  
┃ ┃ ┃ ┗ `TodoList.test.tsx` - Contains automated tests for the `TodoList` dumb component  
┃ ┃ ┣ redux  
┃ ┃ ┃ ┣ reducers  
┃ ┃ ┃ ┃ ┣ `add.test.tsx` - Contains automated tests for the `add` reducer  
┃ ┃ ┃ ┃ ┣ `check.test.tsx` - Contains automated tests for the `check` reducer  
┃ ┃ ┃ ┗ ┗ `remove.test.tsx` - Contains automated tests for the `remove` reducer  
┃ ┃ ┣ utils  
┃ ┃ ┃ ┣ `generateMockTodos.test.ts` - Contains automated tests for the `generateMockTodos` utility function  
┃ ┃ ┃ ┗ `generateRandomNumbers.test.ts` - Contains automated tests for the `generateRandomNumbers` utility function  
┃ ┃ ┗ `test-utils.tsx` - Used for mocking the Redux store inside of the automated tests  
┃ ┣ types  
┃ ┃ ┗ `Todo.type.ts` - exports the shape of a TODO object  
┃ ┣ utils - Contains utility functions used inside the automated tests  
┃ ┃ ┣ `generateMockTodos.tsx` - Used to generate a predefined number of mock TODOs  
┗ ┗ ┗ `generateRandomNumbers.tsx` - Used to generate a different types of random numbers  


## Architecture

Even though this is a simple app, I tried to follow industry best practices. Some of them might be overkill for a TODO app, but I think it's more important to show, as a candidate, that you are aware of best practices and you know how to apply them, instead of not doing it and just talk about them during the technical call.

For example, for this app, I could have consumed the Redux store and dispatched actions to it directly from components like `AddTodoForm` or `TodoList`. This would have sped up the development time, but this would have resulted in coupled code, which is harder to test from multiple angles.

In order to make the codebase as decoupled and as testable as possible, I decided to break the components into two separate types:
- dumb UI components
  - these components only render markup, without having any logic or interactivity inside of them
  - because they are not coupled to Redux and receive all they need through props, it's very easy to test these components, and it's also very easy to swap them with a different component, as long as the props are the same
- Redux-connected components
  - these components are coupled to the Redux store
  - they include event handlers and other logic related to the app
  - they render the dumb UI components to which they pass down the data and event handlers
  - in order to test these components, the Redux store is mocked

No matter if you want to swap one of the dumb components with a new one, or maybe you want to swap Redux with another state management library, the UI part and the state and logic part are pretty decoupled, so it's easy to do that.
Also, I included tests for the dumb components, which test if what's rendered on the screen is correct. And I also included tests related to the Redux-connected components, the Redux store, and the Redux reducers, in order to be sure that the initial state value is correct, that the update logic is correct, and also that the Redux-connected components are correctly connected to the Redux store.

## Continuous integration

I also created a GitHub Actions [workflow file](https://github.com/bradeac/dvt-todolist-assessment-bradeacamil/blob/main/.github/workflows/main.yml) that runs the automated tests on each push to this repository.

I also added a test badge at the top of this README file that shows the status of the last run of the automated tests.