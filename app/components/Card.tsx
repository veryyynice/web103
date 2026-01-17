import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'; 

// 1. Define the "shape" of the props we expect
interface CardProps {
  id: number; // or string, depending on your Supabase setup (usually number or uuid string)
  name: string;
  url: string;
  description: string;
  imageURL?: string; // The "?" means this is optional
}

// 2. Add ": CardProps" next to the props argument
export default function Card({ id, name, url, description, imageURL }: { id: number; name: string; url: string; description: string; imageURL: string }) {
  const safeUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;

  return (
    <div className="Card">
      {imageURL && (
        <div className="card-image">
          <img src={imageURL} alt={name} />
        </div>
      )}
      <div className="card-content">
        <h3>{name}</h3>
        <p>{description}</p>
        <a href={safeUrl} target="_blank" rel="noopener noreferrer" className="contrast">Visit Channel</a>
      </div>
      <div className="card-actions">
        <Link to={`/view_creator/${id}`} className="button">View Details</Link>
        <Link to={`/edit/${id}`} className="button">Edit</Link>
      </div>
    </div>
  );
}