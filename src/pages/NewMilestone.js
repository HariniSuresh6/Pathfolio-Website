import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMilestone } from "../store/milestonesSlice";
import { useNavigate } from "react-router-dom";
import "./modal.css";

export default function NewMilestone({ onClose }) {
  const [form, setForm] = useState({ title: "", date: "", description: "", tags: "" });
  const dispatch = useDispatch();
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    dispatch(createMilestone(payload)).then(() => nav("/"));
  }

  function handleImageChange(e) {
    setForm({ ...form, image: e.target.files[0] });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2 className="modal-title">➕ Add New Milestone</h2>

        <form onSubmit={submit} className="modal-form">
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />


          <button type="submit" className="submit-btn">Add Milestone</button>
        </form>
      </div>
    </div>
  );
}
