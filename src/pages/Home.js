import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMilestones, deleteMilestone } from "../store/milestonesSlice";
import { Link } from "react-router-dom";
import NewMilestone from "./NewMilestone";
import "./timeline.css";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.milestones);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchMilestones());
  }, [dispatch]);

  return (
    <div className="home-container">
      <h3 className="home-title">My Journey</h3>
      <button className="add-btn" onClick={() => setShowModal(true)}>
        ➕ Add Milestone
      </button>

      {showModal && <NewMilestone onClose={() => setShowModal(false)} />}

      {status === "loading" && <p>Loading...</p>}
      <div className="timeline-container">
        {items.map((m) => (
          <div key={m._id} className="milestone-card">
            <h4 className="milestone-title">{m.title}</h4>
            <small className="milestone-date">{new Date(m.date).toLocaleDateString()}</small>
            <p className="milestone-desc">{m.description}</p>
            <div className="milestone-tags">
              {m.tags?.map((t) => (
                <span key={t} className="tag">
                  #{t}
                </span>
              ))}
            </div>
            <div className="milestone-actions">
              <Link className="edit-btn" to={`/milestones/${m._id}`}>
                ✏️ Edit
              </Link>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Delete milestone?")) dispatch(deleteMilestone(m._id));
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
