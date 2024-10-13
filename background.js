// Define a list of sensitive keywords that may appear in search queries
const sensitiveKeywords = [
    "leave my husband",
    "call the police",
    "domestic abuse",
    "how to escape",
    "emergency shelter",
    "abusive relationship",
    "restraining order"
];

// Define benign search terms to replace sensitive queries
const benignQueries = [
    "cat videos",
    "weather forecast",
    "how to bake a cake",
    "funny memes",
    "recipe for pasta",
    "popular movies 2024",
    "local news"
];

// Function to scramble search history entries
function scrambleHistory(url) {
    const searchParams = new URL(url).searchParams;
    const query = searchParams.get('q'); // For Google or Bing, the search query is stored in 'q'

    if (query) {
        // Check if the search query contains sensitive keywords
        for (const keyword of sensitiveKeywords) {
            if (query.toLowerCase().includes(keyword)) {
                // Replace the search query with a random benign query
                const randomQuery = benignQueries[Math.floor(Math.random() * benignQueries.length)];
                const scrambledUrl = url.replace(query, randomQuery);
                console.log(`Scrambling search: "${query}" -> "${randomQuery}"`);

                // Update the history entry with the scrambled search query
                chrome.history.deleteUrl({ url: url }, () => {
                    chrome.history.addUrl({ url: scrambledUrl });
                });
                return;
            }
        }
    }
}

// Monitor browsing history and scramble sensitive searches
chrome.history.onVisited.addListener((historyItem) => {
    const url = historyItem.url;

    // Scramble history only if the URL is from a search engine (e.g., Google, Bing)
    if (url.includes('google.com/search') || url.includes('bing.com/search') || url.includes('duckduckgo.com')) {
        scrambleHistory(url);
    }
});
