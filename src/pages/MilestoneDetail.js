import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMilestone } from "../store/milestonesSlice";
import "./modal.css";
const API = process.env.REACT_APP_API || "http://localhost:5000/api";

export default function MilestoneDetail({ onClose }) {
  const { id } = useParams();
  const [m, setM] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API}/milestones/${id}`)
      .then((r) => {
        setM(r.data);
        setImagePreview(r.data.image || null);
      })
      .catch(() => {});
  }, [id]);

  if (!m) return <p>Loading...</p>;

  function save(e) {
    e.preventDefault();
    const updated = { ...m, tags: m.tags };
    dispatch(updateMilestone({ id: m._id, data: updated })).then(() => {
      if (onClose) onClose();
      else nav("/");
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setM({ ...m, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        {/* Close button */}
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        )}

        <h2 className="modal-title">✏️ Edit Milestone</h2>

        <form onSubmit={save} className="modal-form">
          <input
            required
            placeholder="Title"
            value={m.title}
            onChange={(e) => setM({ ...m, title: e.target.value })}
          />

          <input
            required
            type="date"
            value={new Date(m.date).toISOString().slice(0, 10)}
            onChange={(e) => setM({ ...m, date: e.target.value })}
          />

          <textarea
            placeholder="Description"
            value={m.description}
            onChange={(e) => setM({ ...m, description: e.target.value })}
          />

          <input
            placeholder="Tags (comma separated)"
            value={m.tags?.join(", ")}
            onChange={(e) =>
              setM({
                ...m,
                tags: e.target.value.split(",").map((t) => t.trim()),
              })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
            />
          )}

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
