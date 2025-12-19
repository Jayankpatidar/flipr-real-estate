# TODO List for Backend Fix and Frontend Connection

## Tasks
- [x] Fix backend server.js error by reordering routes imports and usage
- [x] Create missing clientRoutes.js file
- [x] Fix frontend script.js to match backend model fields (title for projects, review for clients)
- [x] Fix frontend script.js to target correct HTML elements (.project-grid, .client-grid)
- [x] Add script.js to index.html
- [x] Fix admin.html to match backend model fields (title for projects, review for clients)
- [x] Fix admin.html to display contact and subscribe data correctly
- [x] Test server startup without errors
- [x] Open frontend index.html to verify connection and data display
- [x] Open admin.html to verify data display in admin panel

## Completed
- [x] Identify the error in server.js (routes not imported correctly)
- [x] Move routes imports after middlewares in server.js
- [x] Create clientRoutes.js with proper router export
- [x] Update script.js to use correct field names from models
- [x] Update script.js to target correct HTML classes
- [x] Add script tag to index.html
- [x] Update admin.html addProject to use "title" instead of "name"
- [x] Update admin.html addClient to use "review" instead of "description"
- [x] Update admin.html contact display to use "mobile" instead of "mobileNumber"
- [x] Remove designation field from admin.html client form
- [x] Start server and open frontend
- [x] Test admin panel data display
