import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom'; // In v7 this still comes from react-router-dom
//import './AddCreator.css'; // Optional: Create this file for styling if you want

const AddCreator = () => {
    // 1. Initialize state for the form fields
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");

    // Hook to navigate back home after submit
    const navigate = useNavigate();

    // 2. The function that runs when you click Submit
    const createCreator = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload

        // Insert into Supabase
        await supabase
            .from('creators')
            .insert([
                { name, url, description, imageURL }
            ])
            .select();

        // Redirect back to the home page (ShowCreators)
        navigate('/'); // This is the React Router v7 way to redirect
    }

    return (
        <div className="AddCreator">
            <h2>Add a New Content Creator</h2>
            
            <form onSubmit={createCreator}>
                {/* NAME INPUT */}
                <label htmlFor="name">Name</label> <br />
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <br /><br />

                {/* URL INPUT */}
                <label htmlFor="url">Channel URL</label> <br />
                <input 
                    type="text" 
                    id="url" 
                    name="url" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} 
                    required 
                />
                <br /><br />

                {/* IMAGE URL INPUT (Optional) */}
                <label htmlFor="imageURL">Image URL (Optional)</label> <br />
                <input 
                    type="text" 
                    id="imageURL" 
                    name="imageURL" 
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)} 
                />
                <br /><br />

                {/* DESCRIPTION TEXTAREA */}
                <label htmlFor="description">Description</label> <br />
                <textarea 
                    id="description" 
                    name="description" 
                    rows={3} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <br /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddCreator;