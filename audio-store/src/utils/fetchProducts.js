export const fetchProducts = async () => {
  const sheetURL = 'https://docs.google.com/spreadsheets/d/1zTDvNwmox0qTHIsoOidBf20zyyZPPyd4oMYJMvk3iE0/gviz/tq?tqx=out:json';

  try {
    console.log("Fetching products from Google Sheets...");
    
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const text = await response.text();
    console.log("Raw response text:", text.substring(0, 200)); // Print first 200 characters
    
    // Extract JSON from Google's weird response format
    const json = JSON.parse(text.substring(47, text.length - 2));
    console.log("Parsed JSON response:", json);
    
    if (!json || !json.table || !json.table.rows) {
      console.error("Invalid JSON format or missing data.");
      return [];
    }

    const rows = json.table.rows;
    console.log(`Number of rows fetched: ${rows.length}`);
    
    const products = rows.map((row, index) => {
      console.log(`Processing row ${index + 1}:`, row);
      
      return {
        id: row.c[0]?.v || `product-${index + 1}`,  // Fallback ID
        title: row.c[1]?.v || "Untitled",
        description: row.c[2]?.v || "No description available",
        index: row.c[3]?.v || "",  // Storing index in case needed later
        category: row.c[4]?.v ? row.c[4].v.toString().trim() : "Uncategorized",
        price: row.c[5]?.v ? parseFloat(row.c[5].v) : 0,  // Ensure numeric price
        images: row.c[6]?.v ? [row.c[6].v] : [], // Store images as an array
      };
    });

    console.log("Final Parsed Products Array:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array to prevent breaking the app
  }
};
