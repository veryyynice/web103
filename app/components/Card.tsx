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
const Card = ({ id, name, url, description, imageURL }: CardProps) => {
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
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" role="button">
            Visit Channel
          </a>
        )}
      </div>
      <div className="card-actions">
        <Link to={`/view/${id}`}>
          <button className="contrast">View Details</button>
        </Link>
        <Link to={`/edit/${id}`}>
          <button className="contrast">Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;