import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'; 
import { Link } from 'react-router-dom';
import './ShowCreators.css';

// 1. Define what a "Creator" looks like in your database
interface Creator {
  id: number;
  name: string;
  url: string;
  description: string;
  imageURL: string;
}

const ShowCreators = () => {
  // 2. Tell useState that it will hold an array of "Creator" objects
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase
        .from('creators')
        .select();

      // Typescript might complain if 'data' is null, so we safely cast it or default to []
      setCreators(data as Creator[] || []);
    };

    fetchCreators();
  }, []);

  return (
    <div className="ShowCreators">
        <div className ="header">
            <hgroup>
                <h1>CreatorVerse</h1>
                <p>Welcome to the ultimate collection of content creators. Explore, add, and manage your favorites.</p>
            </hgroup>
            <Link to="/new" role="button" className="contrast">Add New Creator</Link>
        </div>
      {creators && creators.length > 0 ? (
        <div className="creators-container">
          {creators.map((creator) => (
            //<Link key={creator.id} to={`/view_creator/${creator.id}`}>
              <Card 
                id={creator.id} 
                name={creator.name} 
                url={creator.url} 
                description={creator.description} 
                imageURL={creator.imageURL} 
              />
            //</Link>
          ))}
        </div>
      ) : (
        <h3>No creators found 😔</h3>
      )}
    </div>
  );
};

export default ShowCreators;