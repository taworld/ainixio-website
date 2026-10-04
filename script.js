const services = {
  ai: ["01 / INTELLIGENCE", "AI & digital transformation", "Move beyond isolated experiments. Put useful, governable AI into the workflows that shape your operating model.", "Manual handoffs, disconnected tools and unclear AI ownership make it hard to scale improvements with confidence.", ["AI opportunity and readiness assessment", "Workflow automation and human review design", "Enterprise AI integration and governance plan"], "Selected to fit your environment: cloud AI services, large language models, orchestration frameworks, APIs, identity controls and observability tooling.", "Baseline and track cycle time, manual effort, exception rates, adoption and quality. Targets are agreed with your team; outcomes depend on workflow and data readiness."],
  data: ["02 / DATA", "Data virtualization & analytics", "Connect the signals your organisation needs and make timely, trusted insight easier to reach.", "Data spread across systems creates slow reporting, inconsistent definitions and decisions made without the whole picture.", ["Data architecture and source mapping", "Modern pipelines, integration and governance", "Interactive dashboards and predictive metrics"], "A pragmatic mix of cloud data platforms, SQL, streaming and batch pipelines, semantic layers, BI tools and applied machine learning.", "Measure data freshness, reporting effort, dashboard adoption, forecast quality and time from question to decision against an agreed baseline."],
  software: ["03 / ENGINEERING", "Software & app development", "Build digital products and business software around real users, real constraints and the next stage of your growth.", "Legacy applications and off-the-shelf workarounds can limit customer experience, delivery speed and operational control.", ["Product discovery, UX and technical architecture", "Web, iOS and Android application engineering", "Quality assurance, deployment and ongoing support"], "Chosen for your product: modern web frameworks, native or cross-platform mobile, API-first services, automated testing and cloud-native deployment.", "Evaluate adoption, task completion, release frequency, defect rates and support demand. We define the right product measures before delivery begins."],
  marketing: ["04 / GROWTH", "Digital marketing automation", "Coordinate relevant customer journeys, reduce campaign busywork and give teams a clearer view of performance.", "Disconnected campaign tools and manual handoffs make personalisation difficult and attribution hard to trust.", ["Funnel and journey automation design", "Audience, consent and campaign integrations", "Performance dashboards and experimentation plan"], "Integrated with your existing CRM, marketing automation and advertising platforms, analytics, consent management and reporting tools.", "Track qualified conversion, cost per acquisition, time to launch, lead response and consent-safe audience performance. No return is assumed in advance."],
  security: ["05 / TRUST", "Cybersecurity & cloud infrastructure", "Strengthen the foundations beneath your digital services with security-aware architecture and dependable operations.", "Growing cloud estates, inconsistent access controls and untested recovery plans can expose critical operations to avoidable risk.", ["Cloud architecture and security posture review", "Zero-trust access and identity improvement roadmap", "Resilience, backup and disaster recovery design"], "Aligned to your providers and policies: cloud-native security, identity and access management, infrastructure as code, monitoring and recovery automation.", "Assess control coverage, recovery objectives, incident response readiness, infrastructure utilisation and cloud cost against documented baselines."],
  energy: ["06 / RESILIENCE", "Green energy & solar solutions", "Make energy a better-informed part of your infrastructure plan, from opportunity assessment to connected deployment.", "Unclear consumption patterns and site constraints make it difficult to compare clean energy investments or plan implementation.", ["Energy use and site readiness assessment", "Solar deployment and integration planning", "Smart monitoring and clean energy roadmap"], "Designed around site conditions and local requirements: energy monitoring, solar and storage systems, building controls and operational data integration.", "Model energy use, generation potential, peak demand and resilience with transparent assumptions. Financial and emissions outcomes require site-specific validation."]
};

const dialog = document.querySelector("#service-dialog");
function openService(id) {
  const service = services[id];
  if (!service) return;
  const [eyebrow, title, lede, challenge, items, stack, roi] = service;
  document.querySelector("#dialog-eyebrow").textContent = eyebrow;
  document.querySelector("#dialog-title").textContent = title;
  document.querySelector("#dialog-lede").textContent = lede;
  document.querySelector("#dialog-challenge").textContent = challenge;
  document.querySelector("#dialog-stack").textContent = stack;
  document.querySelector("#dialog-roi").textContent = roi;
  const list = document.querySelector("#dialog-deliverables");
  list.replaceChildren(...items.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
  dialog.showModal();
}

document.querySelectorAll(".service-open").forEach((button) => button.addEventListener("click", () => openService(button.dataset.service)));
document.querySelectorAll("[data-service-link]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  openService(link.dataset.serviceLink);
}));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector("#dialog-cta").addEventListener("click", () => dialog.close());

const menu = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
menu.addEventListener("click", () => {
  const expanded = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!expanded));
  menu.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open menu");
}));

document.querySelector("#inquiry-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const interests = values.getAll("interest");
  const body = [
    `Name: ${values.get("name")}`,
    `Work email: ${values.get("email")}`,
    `Primary focus: ${values.get("service")}`,
    `Other interests: ${interests.length ? interests.join(", ") : "None selected"}`,
    `Indicative investment: ${values.get("budget")}`,
    `Preferred meeting date: ${values.get("meeting") || "Not specified"}`,
    `Calendar link requested: ${values.get("schedule") ? "Yes" : "No"}`,
    "",
    String(values.get("message"))
  ].join("\n");
  const subject = encodeURIComponent(`AINIXIO project inquiry: ${values.get("service")}`);
  document.querySelector("#form-note").textContent = "Your email app is opening with your inquiry. Review it and send when ready.";
  window.location.href = `mailto:hello@ainixio.com?subject=${subject}&body=${encodeURIComponent(body)}`;
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#newsletter-email").value;
  const subject = encodeURIComponent("AINIXIO newsletter subscription");
  const body = encodeURIComponent(`Please add ${email} to the AINIXIO newsletter.`);
  document.querySelector("#newsletter-note").textContent = "Your email app is opening to request a subscription.";
  window.location.href = `mailto:hello@ainixio.com?subject=${subject}&body=${body}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}
