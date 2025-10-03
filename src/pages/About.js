// About.js
import React, { useState } from "react";
import "./about.css";

export default function About() {
  const [active, setActive] = useState(null);

  const toggle = (i) => setActive(active === i ? null : i);

  const sections = [
    {
      title: "👩‍💻 Who I Am",
      content:
        "I’m a passionate developer who loves building web apps that feel alive. Pathfolio is my way of showing not just my projects, but the journey that shaped me.",
    },
    {
      title: "🚀 What I Do",
      content:
        "I specialize in MERN stack development, React + Redux, and creating meaningful digital experiences. I love blending creativity with functionality.",
    },
    {
      title: "🎨 Fun Facts",
      content:
        "Besides coding, I enjoy design, storytelling, and solving real-world problems. I believe every line of code has a story to tell!",
    },
  ];

  return (
    <div className="about-container">
      <h2 className="about-title">About Me</h2>
      <p className="about-subtitle">A portfolio that walks you through my path ✨</p>

      <div className="accordion">
        {sections.map((sec, i) => (
          <div
            key={i}
            className={`accordion-item ${active === i ? "active" : ""}`}
          >
            <div className="accordion-title" onClick={() => toggle(i)}>
              <h3>{sec.title}</h3>
              <span>{active === i ? "–" : "+"}</span>
            </div>
            {active === i && <p className="accordion-content">{sec.content}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
