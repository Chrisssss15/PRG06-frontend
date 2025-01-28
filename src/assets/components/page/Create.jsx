import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import FormComponent from "../FormComponent.jsx";


function Create () {
    const [tokens, setToken] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // State to track loading status

    useEffect(() => {
        async function fetchProduct() {
            try {
                setIsLoading(true); // Set loading to true before fetching data
                const response = await fetch('http://145.24.223.22:8888/tokens', { // Fetch the data from the API
                // const response = await fetch('http://localhost:8888/tokens', { // Fetch the data from the API
                    method: 'GET', // GET requestdee
                    headers: {
                        'Accept': 'application/json' // Accept JSON data
                    }
                });
                const data = await response.json(); // Parse the JSON data
                setToken(data.items); // Set the data to the product state
                console.log(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Fout bij het ophalen van het tokens:', error);
            }
        }

        fetchProduct();
    }, []); // Lege array zorgt ervoor dat useEffect alleen bij de eerste render wordt uitgevoerd.

    const navigate = useNavigate();

    const formUpdater = () => {
        navigate('/'); // Navigate to /tokens
    };

    return (
        <div>
            {isLoading && (
                <div>Loading...</div>
            )}

            <div>
                <FormComponent onResourceAdded={formUpdater} />
            </div>
        </div>
    );
}

export default Create;
