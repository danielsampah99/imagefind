// Access key from unsplash.com to access their api.
const accessKey = "R8VF5DtWaupfudeO9XsvbtXuc-ENVeDOt7jxPqY3OBI";

// Representing html elements in javascript.
const formElement = document.querySelector("form") as HTMLFormElement;
const inputElement = document.getElementById("searchInput") as HTMLInputElement;
const searchResults = document.querySelector(".search--results");
const showMore = document.getElementById("show-more--button");

let inputData = "";
let page: number = 1;

// Function to control image search.
async function searchImages() {
	inputData = inputElement.value;
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

	// Fetch data from the api.
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch data: ${response.status}`);
	}

	// Parse the JSON response.
	const data = await response.json();

	const results = data.result;

	console.log(results);

	if (page === 1) {
		searchResults.innerHTML = "";
	}

	// console.log(results);

	results.forEach((result) => {
		const imageWrapper = document.createElement("div");
		imageWrapper.classList.add("search-result");

		const image = document.createElement("img");
		image.setAttribute("src", result.urls.full);

		if (result.alt_description) {
			image.alt = result.alt_description;
		} else {
			image.alt = "Image Description Is Not Available At This Time.";
		}

		const imageLink = document.createElement("a");
		imageLink.href = result.links.html;
		imageLink.target = "_blank";
		imageLink.textContent = result.alt_description;

		imageWrapper.appendChild(image);
		imageWrapper.appendChild(imageLink);
		searchResults.appendChild(imageWrapper);
	});

	// Increment the page number
	page++;

	// Show the "Show More" button if on page 2 or higher
	if (page > 1) {
		showMore.style.display = "block";
	}
}

// Create an event listener for the form element.
formElement.addEventListener("submit", async (event) => {
	event.preventDefault();
	page = 1;
	await searchImages();
});

// Create an event listener for the show more button.
showMore.addEventListener("click", async () => {
	await searchImages();
});
