# Student Portfolio and Academic Management Website

A responsive static portfolio and academic planner for Kelyandame Oluwafolajimi Akinlade, a Miva Open University student studying Data Science.

## Features
- Five connected pages: Home, About Me, Projects, Academic Planner, and Contact.
- Shared navigation with responsive mobile menu.
- Professional portfolio design using HTML5, CSS3, and vanilla JavaScript.
- Academic planner with add, complete, filter, delete, and localStorage persistence features.
- Contact form with JavaScript validation for required fields, email format, and phone number digits.
- Semantic HTML structure, tables, imagery, and a multimedia section.

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure
```text
student-portfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── planner.js
│   └── contact.js
├── assets/
│   ├── profile-placeholder.svg
│   ├── project-portfolio.svg
│   ├── project-planner.svg
│   └── project-inventory.svg
├── README.md
```

## How to Open the Website Locally
1. Download or clone the project folder.
2. Open the folder in VS Code.
3. Open any page such as `index.html` in a browser, or run a small local server from the project folder.

Example using a local Python server:
```bash
cd "C:\Users\PLAN B\Documents\PROJECT-KELY'S SCHOOL PORTFOLIO"
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## HTML, CSS, and JavaScript Features Demonstrated
- Semantic elements such as `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer`
- Responsive layouts using Flexbox and CSS Grid
- CSS custom properties, media queries, hover interactions, transitions, and focus states
- JavaScript variables, arrays, objects, functions, event listeners, DOM manipulation, and localStorage
- Form validation and dynamic task rendering

## GitHub Pages Deployment
1. Create a GitHub repository.
2. Upload all project files to the repository.
3. Open the repository on GitHub.
4. Go to Settings > Pages.
5. Select the main branch and the root folder (`/`). Save the settings.
6. GitHub will provide a live URL for the site once the deployment finishes.

## Personalisation Checklist Before Submission
- Update the `STUDENT_NAME` constant in `js/main.js` to change the name displayed in the navigation, homepage greeting, and footer.
- Replace the illustration with a real profile photo if available.
- Add a personal video at `assets/portfolio-intro.mp4` and add a matching `<source>` element to the video in `projects.html` if you want to showcase your own media. Until then, the site displays an illustrated fallback and keeps the empty video player hidden.
- Review the biography to make sure it reflects your personal story honestly.
- Check that no private information such as address, date of birth, religion, or marital status is included.
- Confirm that the project meets your lecturer’s assignment requirements.

## Notes
This project is designed as a static website and does not include a database or backend server. Any form submission result is only client-side validation feedback and would require a real backend or form service for actual message delivery.
