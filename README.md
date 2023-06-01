# TASK LIST APP

### App improvements

- [x] CREATE NEW PROJECT USING THE CLI BECAUSE IT HAS TYPESCRIPT BY DEFAULT
- [x] INSTALL ALL DEPENDENCIES AND COPY THIS PROJECT WITH THE NEW VERSION OF REACT
- [x] Install native base
      [x] Config native base theme
      [x] Enable native base extension on vs code
- [x] Install react navigationx
- [x] Create main navigation
- [x] Create Header component
- [x] Reply the components from the original project
- [x] Add feature to create a new todo
- [x] Add feature to update one todo
- [x] Config AsyncStorage to save our todos (with redux)?
- [x] Add undo action after delete a task
- [x] play sound when checked a task
  - [x] Add fix to play checked sound only after the component was render at least once (When tasks are loaded TodoItem play the sound)
- [x] Add empty state when user doesn't have tasks
- [x] Add loading state while user tasks are loading from async storage
- [x] Add feature to allow watch tasks with large text
- [ ] Add feature to delete completed todos
- [ ] Add feature to delete all todos
- [ ] Create view to insert the user name and show it in the welcome header screen
- [ ] Search something to save a local image to customize the avatar
- [ ] Add filters? (sort by newest or sort by oldest, show done, not done, all, )
- [ ] Add keyboard avoid view to allow watch what I write when I create a new Task
- [ ] Add testing with jest
- [ ] Monitor performance about useEffect to sync data state with Async storage (Show button to save changes?)
- [ ] Show alerts when todo is created or deleted (this maybe no because we must show the undo toast)

# POSIBLE FEATURES

- [ ] Creacte collections of todos (home: [todo1, todo2], school: [todo3, todo4])
- [ ] Update collection name
- [ ] Delete collection
- [ ] Delete all collections
- [ ] Add trash section to see deleted items, remove it after 30 days

# Posible future version features

- [ ] Sync data with a db after user login
