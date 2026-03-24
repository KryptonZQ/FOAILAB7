/**
 * API Fetching Layer
 * Contains async functions to interface with external APIs.
 */

// 1. Dog API
export async function fetchDogInfo() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Extract breed from URL
    // URL format: https://images.dog.ceo/breeds/hound-afghan/n02088632_10444.jpg
    const urlParts = data.message.split('/');
    const breedIndex = urlParts.indexOf('breeds') + 1;
    let breed = 'Unknown Breed';

    if (breedIndex > 0 && breedIndex < urlParts.length) {
        const breedSlug = urlParts[breedIndex];
        // Convert 'hound-afghan' to 'Afghan Hound'
        breed = breedSlug.split('-').reverse().map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    return {
        image: data.message,
        breed: breed
    };
}

// 2. Joke API
export async function fetchRandomJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    return {
        setup: data.setup,
        punchline: data.punchline
    };
}

// 3. Random User API
export async function fetchRandomUser() {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    const user = result.results[0];

    return {
        fullName: `${user.name.first} ${user.name.last}`,
        picture: user.picture.large,
        email: user.email,
        country: user.location.country,
        age: user.dob.age,
        phone: user.phone
    };
}

// 4. JSONPlaceholder
export async function fetchRandomPost() {
    // There are 100 posts total
    const randomId = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    return {
        title: data.title,
        body: data.body,
        id: data.id
    };
}
