import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
//import './EditCreator.css'; // Optional styling

const EditCreator = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();

    // 1. Initialize state (same as AddCreator)
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");

    // 2. Fetch the EXISTING data when the page loads
    useEffect(() => {
        const fetchCreator = async () => {
            const { data } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single(); // Get the specific creator

            if (data) {
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL);
            }
        };

        fetchCreator();
    }, [id]);

    // 3. The function to UPDATE the data
    const updateCreator = async (event: React.FormEvent) => {
        event.preventDefault();

        await supabase
            .from('creators')
            .update({ name, url, description, imageURL })
            .eq('id', id); // ⚠️ VERY IMPORTANT: Only update the row with this ID!

        navigate('/'); // Go back home
    }

    // 4. The function to DELETE (Step 9 Preview)
    // We add this here because the Delete button usually lives on the Edit page
    const deleteCreator = async (event: React.MouseEvent) => {
        event.preventDefault();
        
        const confirmed = window.confirm("Are you sure you want to delete this creator?");
        
        if (confirmed) {
            await supabase
                .from('creators')
                .delete()
                .eq('id', id); // ⚠️ Delete only this ID
            
            navigate('/');
        }
    }

    return (
        <div className="EditCreator">
            <h2>Edit Creator</h2>
            
            <form onSubmit={updateCreator}>
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

                <label htmlFor="url">URL</label> <br />
                <input 
                    type="text" 
                    id="url" 
                    name="url" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    required 
                />
                <br /><br />

                <label htmlFor="imageURL">Image URL</label> <br />
                <input 
                    type="text" 
                    id="imageURL" 
                    name="imageURL" 
                    value={imageURL} 
                    onChange={(e) => setImageURL(e.target.value)} 
                />
                <br /><br />

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

                {/* Submit Changes Button */}
                <input type="submit" value="Update Creator" />
                
                {/* Delete Button (Step 9) */}
                <button 
                    className="delete-button" 
                    onClick={deleteCreator} 
                    style={{ marginLeft: '10px', backgroundColor: '#c62828', borderColor: '#c62828' }}
                >
                    Delete Creator
                </button>
            </form>
        </div>
    )
}

export default EditCreator;