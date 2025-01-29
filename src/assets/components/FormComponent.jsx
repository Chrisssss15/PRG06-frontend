import React, {useState} from 'react';

function FormComponent({ onResourceAdded }) {
    const [formData, setFormData] = useState({
        nameToken: '',
        tigger: '',
        adress: ''
    });

    // Generieke handler voor het bijwerken van de state
    const handleInputChange = (event) => {
        const { name, value } = event.target; // Gebruik 'name' in plaats van 'title'
        setFormData({
            ...formData,
            [name]: value, // Gebruik de 'name' als key
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting formData:', formData); // Log de data die wordt verstuurd

        try {
            // for (let i = 0; i < 10000; i++) {
            const response = await fetch('http://145.24.223.22:8888/tokens', {
            // const response = await fetch('http://localhost:8888/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error('Error details:', errorDetails); // Log foutdetails
                throw new Error(`Failed to create resource: ${response.statusText}`);
            }

            const newResource = await response.json();
            // console.log(`New resource created at iteration ${i + 1}:`, newResource);
            console.log(`New resource created at iteration:`, newResource);
            onResourceAdded(newResource);
            // }
            setFormData({ nameToken: '', tigger: '', adress: '' }); // Reset the form
        } catch (error) {
            console.error('Fout bij het ophalen van tokens:', error);
            alert('Er is een probleem met de verbinding. Controleer of de server draait.');
        }
    };




    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto justify-center bg-white p-8 shadow-lg rounded-lg space-y-6 mt-20 fixed top-12 left-0 w-full z-12">
            <div>
                <label htmlFor="nameToken" className="block text-gray-700 font-semibold mb-2">
                    Name token:
                </label>
                <input
                    type="text"
                    id="nameToken"
                    name="nameToken"
                    value={formData.nameToken}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="tigger" className="block text-gray-700 font-semibold mb-2">
                    Tigger:
                </label>
                <input
                    type="text"
                    id="tigger"
                    name="tigger"
                    value={formData.tigger}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="adress" className="block text-gray-700 font-semibold mb-2">
                    Adress:
                </label>
                <input
                    type="text"
                    id="adress"
                    name="adress"
                    value={formData.adress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Verzenden
            </button>
        </form>

    );
}

export default FormComponent;
