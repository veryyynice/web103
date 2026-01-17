import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams gets the ID from the URL
import { supabase } from '../client';
//import './ViewCreator.css'; // Optional styling

interface Creator {
  id: number;
  name: string;
  url: string;
  description: string;
  imageURL: string;
}

const ViewCreator = () => {
  const { id } = useParams(); // Get the ID from the URL route e.g. /view/:id
  const [creator, setCreator] = useState<Creator | null>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      // Fetch the single creator where the 'id' column matches our URL id
      const { data } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single(); // .single() returns one object instead of an array

      setCreator(data);
    };

    fetchCreator();
  }, [id]);

  // While data is loading...
  if (!creator) return <h2>Loading...</h2>;

  return (
    <div className="ViewCreator">
      
      {/* Container for the content */}
      <div className="creator-details">
        
        {/* Optional Image */}
        {creator.imageURL && (
          <img src={creator.imageURL} alt={creator.name} style={{ maxWidth: '400px' }} />
        )}

        <h1>{creator.name}</h1>
        <p>{creator.description}</p>
        
        {/* External Link */}
        <a href={creator.url} target="_blank" rel="noopener noreferrer">
          <button className="outline">Visit Channel</button>
        </a>

        {/* Step 8a: Edit Button */}
        {/* We add this now so you can easily navigate to the edit page later */}
        <div style={{ marginTop: '20px' }}>
            <Link to={`/edit/${creator.id}`}>
                <button>Edit Creator</button>
            </Link>
        </div>
        
      </div>
    </div>
  );
};

export default ViewCreator;