
# Note Corner

- Video Demo: https://drive.google.com/file/d/1noahnyg9g6vFVmgE9Przvo35iczilA1F/view?usp=sharing

Our project is a comprehensive productivity web application designed to streamline various tasks and enhance user efficiency. Combining an array of features within a single platform, our web app serves as a versatile toolkit for users seeking a consolidated solution for productivity management.

## Key Features:

- ```Rich Text Editing```: Our app supports rich text editing capabilities, empowering users to format, style, and organize their textual content with ease. Whether it's drafting documents, composing emails, or taking notes, the rich text editor provides a seamless experience.

- ```AI Integration```: Our app leverages AI algorithms to analyze user input and APIs to provide prompts and output results. Additionally, it suggests inline text suggestions when users write in the text editor.

- ```Block Code Execution```: With built-in support for block code execution, our app enables users to write and execute code snippets directly within the interface. This feature caters to developers, students, and professionals alike, facilitating rapid prototyping, testing, and debugging.

- ```Todos```: The Todos feature offers a convenient task management system, allowing users to create, organize, and track their tasks effectively. Users can set priorities, deadlines, and reminders, ensuring efficient task completion and time management.

- ```Calendar and Events```: Our app includes a dynamic calendar functionality, enabling users to schedule and manage events, appointments, and meetings effortlessly. Integration with the calendar allows for seamless synchronization and reminders, enhancing productivity and organization.

- ```Excalidraw Embed```: Integration of Excalidraw, a collaborative whiteboard tool, enhances visual communication and brainstorming within the app. Users can create, annotate, and share diagrams, flowcharts, and sketches seamlessly, fostering collaboration and creativity.

- ```Collaborative Environment```: Users can work together in real-time, typically to edit, create, or manage content.

Overall, our AI-enabled productivity web app redefines productivity management by seamlessly integrating traditional productivity features with cutting-edge AI capabilities. By harnessing the power of AI, users can optimize their workflow, make data-driven decisions, and achieve peak productivity with minimal effort.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Rudra-IITM/Note-Corner
```

Go to the project directory

```bash
  cd Note-Corner
```

Install dependencies

```bash
  npm install
```

Setup environment variables
```bash
  cp .env.example .env
```

Migrate database
```bash
  npx prisma migrate dev
```
  

Start AI server

```bash
  node aiBackend/src/index.js
```

Start the Next App

```bash
  npm run dev
```
## Tech Stack

**Client:** Next, TailwindCSS, NextAuth, DratJS, Judge0

**Server:** Node, Express, Next, Prisma

**Database:** ProstreSQL

**Component Library:** ShadCN


## Dependencies

**Google Auth:** If want to sign in with google locally.

**Judge0 API credentails:** For code execution.
