

export default function Home() {
  
const apiKey = 'AIzaSyABmGaHJ6lDIFPjrYQyfsSa2UCw5zKhPhA';
const address = '566 45th Street, Brooklyn, NY'; 

// Fetch voter information
fetch(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${encodeURIComponent(address)}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  return ( 
    <p>Hello, world, this is my first Next.js app! Here is my voting information:
    
    </p>
   )
}
