USE trektrack;

-- Insert sample projects
INSERT INTO projects (title, description, category, author, image_url) VALUES
('Himalayan Base Camp Trek', 'Experience the breathtaking views of Mount Everest on this challenging trek to Base Camp. Perfect for experienced hikers looking for an adventure of a lifetime.', 'Mountain Trek', 'John Doe', 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b'),
('Kerala Backwaters Tour', 'Explore the serene backwaters of Kerala on traditional houseboats. Experience local culture, cuisine, and natural beauty.', 'Cultural Tour', 'Sarah Smith', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2'),
('Ladakh Bike Expedition', 'A thrilling motorcycle journey through the highest motorable passes in the world. Visit ancient monasteries and experience Ladakhi culture.', 'Adventure', 'Mike Johnson', 'https://images.unsplash.com/photo-1617653695386-844cc0aa24c7'),
('Goa Beach Retreat', 'Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa. Perfect for beach lovers and party enthusiasts.', 'Beach Holiday', 'Lisa Anderson', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'),
('Rajasthan Heritage Tour', 'Discover the royal heritage of Rajasthan. Visit majestic forts, palaces, and experience the desert culture of India.', 'Cultural Tour', 'David Wilson', 'https://images.unsplash.com/photo-1524493160387-f0c986d5f7ac'),
('Valley of Flowers Trek', 'A moderate trek through the UNESCO World Heritage site known for its meadows of endemic alpine flowers and variety of flora.', 'Nature Trek', 'Emma Davis', 'https://images.unsplash.com/photo-1564507592333-c60657eea523');

-- Insert sample cart items
INSERT INTO cart (user_id, project_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 4),
(3, 5),
(3, 6);