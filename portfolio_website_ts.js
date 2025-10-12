// JS file for portfolio website by Tanishka Soni 

// Handles page switching
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');
  else console.error(`Page not found: ${pageId}`);
}

// Generate portfolio preview dynamically
function generatePortfolio() {
  const name = document.getElementById('name').value;
  const tagline = document.getElementById('tagline').value;
  const about = document.getElementById('about').value;
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(Boolean);
  const projectsInput = document.getElementById('projects').value.split('\n').filter(Boolean);
  const email = document.getElementById('email').value;

  const projects = projectsInput.map(line => {
    const [title, desc, link] = line.split('|');
    return { title, desc, link };
  });

  const data = { name, tagline, about, skills, projects, email };
  localStorage.setItem('portfolioData', JSON.stringify(data));

  renderPortfolio(data);
  showPage('preview');
}

// Render portfolio to preview section
function renderPortfolio(data) {
  const container = document.getElementById('portfolioPreview');
  container.innerHTML = `
    <h1>${data.name}</h1>
    <h3>${data.tagline}</h3>
    <p>${data.about}</p>
    <h2>Skills</h2>
    <ul>${data.skills.map(s => `<li>${s}</li>`).join('')}</ul>
    <h2>Projects</h2>
    ${data.projects
      .map(
        p => `
      <div class='project-card'>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <a href='${p.link}' target='_blank'>View Project</a>
      </div>`
      )
      .join('')}
    <h2>Contact</h2>
    <p>Email: <a href='mailto:${data.email}'>${data.email}</a></p>
  `;
}

// Load saved data on refresh
window.onload = () => {
  const saved = localStorage.getItem('portfolioData');
  if (saved) {
    const data = JSON.parse(saved);
    renderPortfolio(data);
  }
};
