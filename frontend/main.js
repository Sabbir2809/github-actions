const topics = [
  {
    title: "What is GitHub Actions",
    desc: "GitHub Actions হলো automation tool যা CI/CD pipeline run করে.",
    use: "Code push → test → deploy automatically",
    example: "git push → test run → deploy",
  },
  {
    title: "Easy Explanation",
    desc: "Simple ভাবে: GitHub এর ভিতরের automation robot 🤖",
    use: "Manual কাজ automate করা",
    example: "Code push করলেই test run",
  },
  {
    title: "CI/CD Concept",
    desc: "Continuous Integration + Continuous Deployment",
    use: "Code always ready থাকে deploy করার জন্য",
    example: "Push → Test → Build → Deploy",
  },
  {
    title: "Workflow",
    desc: "Workflow হলো automation script (YAML file)",
    use: "Project automation control করা",
    example: ".github/workflows/main.yml",
  },
  {
    title: "Matrix Strategy",
    desc: "Same job multiple version এ run করা",
    use: "Compatibility check",
    example: "Node 18, 20, 22 test",
  },
  {
    title: "Cache",
    desc: "Dependency cache করে build fast করা",
    use: "Time save",
    example: "node_modules cache",
  },
  {
    title: "Artifacts",
    desc: "Build output store করা",
    use: "Deploy বা download",
    example: "zip file upload",
  },
  {
    title: "Secrets",
    desc: "Sensitive data secure রাখা",
    use: "API key protect",
    example: "DB password",
  },
  {
    title: "Reusable Workflow",
    desc: "Same workflow reuse করা",
    use: "Large project simplify",
    example: "common CI file",
  },
  {
    title: "Composite Action",
    desc: "Multiple step একসাথে package করা",
    use: "Reusable logic",
    example: "build + test এক action",
  },
  {
    title: "Docker Actions",
    desc: "Custom environment create করা",
    use: "Full control execution",
    example: "docker container run",
  },
  {
    title: "Self Hosted Runner",
    desc: "নিজের server এ workflow run করা",
    use: "Custom hardware use",
    example: "own VPS runner",
  },
  {
    title: "Environment & Approval",
    desc: "Deploy এর আগে approval system",
    use: "Safe production deploy",
    example: "manager approve",
  },
  {
    title: "Debugging Tips",
    desc: "Error হলে logs check করা",
    use: "Problem solve",
    example: "echo, step logs",
  },
];

const container = document.getElementById("topics");

topics.forEach((t) => {
  container.innerHTML += `
    <div class="card">
      <h2 class="title">${t.title}</h2>
      <p>${t.desc}</p>
      <p class="usecase"><strong>Use:</strong> ${t.use}</p>
      <p><strong>Example:</strong> ${t.example}</p>
    </div>
  `;
});
