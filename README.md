#firebase
? Set up automatic deployment to your site's live channel when a PR is merged? No

i  Action required: Visit this URL to revoke authorization for the Firebase CLI GitHub OAuth App:
https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
i  Action required: Push any new workflow file(s) to your repo


# Project
act as a senior frontend developer to help me build a  responsive fitness website Tech stack: React TS, MUI, Build tools and module bundlers (RsBuild),Firebase for Auth and hosting , Mockdata for fetching the plans and exercises

read the following requirements
rememeber this is the goal of the project
the user can log in and then choose a workout plan (there should be at least 5 plans) each plan will be like very elegant responsive card that has a picture , title, description, and Level
after choosing the plan it opens new page where it  shows also multiple cards with the same properties as the plan the amount of cards depends on each plan
each card will represent a workout day for example if the user choose pull-push-leg plan the it will appear 3 cards day 1 push, day 2 pull and day 3 leg

after clicking at any day a new page will open that list all exercises thats need for that specific program
still same as plan properties  (picture , title, description, and Level)

when clicking on any exercises, a  pop-up appears
the layout of this pop-up will be on the right side an accordion that contain a video player on the right that will play the exercise instruction from YouTube
under it the exercise related form
the form has add set button that produce a new set but there will be always 1 set at least.
each set will have title and input fields for "repetition: only positive numbers" , "Weight or Time (depending on the exercise if its weight lifting or cardio): positive numbers only with unit kg or sec"
"rest: fixed value depends on the exercise "

on the left side it start with exercise name, below it the Picture of the exercise and  below that a description of the exercise if the user don't want to play the video

a save and cancel button at bottom right of the dialog if the user has entered any data show a new pop up if he sure he want to close this without saving

after the user save an exercise that card will be greyed out only and get stamped Done, and moved to the end of the list and the next exercise will be moved to the first place
afterward,  the entry will be saved in the Training history log
after all exercise in that done are done some cool animation appears and say "congratulation Training done for Today your strike is ##, see you soon"
the strike will be the numbers of the days where the user trained " the Strike logic will be developed later"

in the Training history it logs first the Plan name and the day as an accordion and then each exercise as a tree where the sets will be the subtree as a list (number, repetition, weight or time)

dont implement anything yet 
i will provide the stories

Progress Tracking
Implement strike system
Add training history logging
Create progress animations


Add loading states for exercise transitions
Implement proper error boundaries
Add animation utilities
Enhance mobile responsiveness


Core Features
1. Authentication System
User login/signup using Firebase Auth
Protected routes for authenticated users
Workout Plans Section
Display multiple workout plans (min 5)
Responsive card layout with plan details
Plan properties: image, title, description, difficulty level
Workout Days Section
Dynamic cards based on selected plan
Example: Push/Pull/Legs would show 3 cards
Same card properties as plans
Exercises List
Exercise cards for each workout day
Properties: image, title, description, difficulty level
Status tracking (completed/pending)
Dynamic reordering (completed exercises move to end)
Exercise Detail Dialog
Split layout design
Left side: Exercise info (name, image, description)
Right side:
Video player (YouTube integration)
Dynamic set tracking form
Exercise-specific rest periods
Training History
Hierarchical view (Plan → Day → Exercises → Sets)
Accordion-based UI for better organization
Detailed set information tracking


Popups: side from right half of the screen pop up, normal pop up , Drawer for mobile


# old improvments

i want to build a fitness app where the user can choose his workout routine, then follow the instructions in the routine , adjust the volume repetition, and see a video for each exercise

lets start to build first the mocked data


Add animations and transitions?

Implement user settings context?
Add more advanced progress tracking features?
Add workout history and statistics?

Add form state persistence (save as draft)?
Implement form submission with API integration?
Add more advanced exercise parameters?
Create a workout template system?

Add draft versioning?
Implement draft export/import?
Add draft categories or tags?
Implement draft sharing functionality?


Add more analytics and charts?
Implement personal records tracking?
Add goal setting and tracking?
Implement workout suggestions based on progress?

Add export functionality for workout data?
Implement more advanced statistics calculations?
Add exercise-specific progress tracking?
Create comparison tools for different time periods?

Add protected routes for authenticated users?
Implement route-specific layouts?
Add loading states for route transitions?
Create breadcrumb navigation based on the route hierarchy?
-------------
how can i refactor the current project to have a better structure
i want only the pages i display in page folder
a feature folder that contains the components that build the feature, util, api, types, hooks and context folder
and a component folder that have 2 parts, common components and shared component if the same component is shared in 2 laces at least
----------

# Fitness App Project Structure

```
src/
├── components/
│   ├── common/               # Shared/reusable components
│       ├── Buttons/
│       ├── Cards/
│       ├── Layouts/
│       ├── Forms/
│       ├── Popups/
│       └── VideoPlayer/
├── features/               # Feature-based modules
│   ├── workout/
│   │   ├── api/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   ├── progress/
│   └── statistics/
├── pages/
├── contexts/
├── hooks/
├── utils/
├── config/                # App configuration
└── styles/                # Global styles
```

# Development Roadmap

## Phase 1: Setup & Basic Structure
1. Initialize React project with Vite
2. Install dependencies:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   npm install react-router-dom
   ```
3. Set up project structure
4. Create basic theme configuration
5. Implement routing

## Phase 2: Core Features
1. Create mock data structure
2. Implement basic components
3. Build workout listing and details
4. Add exercise video player
5. Create workout selection functionality

## Phase 3: Workout Management
1. Implement workout builder
2. Add repetition/volume controls
3. Create workout tracking
4. Add progress indicators

## Phase 4: UI/UX Enhancement
1. Add animations
2. Implement responsive design
3. Add loading states
4. Enhance error handling
