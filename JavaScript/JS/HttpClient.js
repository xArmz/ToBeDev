async function getData() {
    const url = 'https://restcountries.com/v3.1/all';
    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('URL not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            
        }

        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error.message);
    }
}