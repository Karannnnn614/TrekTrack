USE KARANDB;

-- Inserting dummy projects
INSERT INTO projects (title, description, category, author, image_url) VALUES
('E-commerce Platform', 'A full-stack e-commerce solution with React and Node.js. Features include user authentication, product management, and payment integration.', 'Web Development', 'John Doe', 'https://images.unsplash.com/photo-1605902711622-cfb43c44367b?auto=format&fit=crop&w=800&q=60'),

('Weather App', 'Real-time weather application using OpenWeather API. Built with React and features dynamic weather updates and 5-day forecasts.', 'Mobile Apps', 'Jane Smith', 'https://images.unsplash.com/photo-1596990071451-9fe0fbc7c28c?auto=format&fit=crop&w=800&q=60'),

('Task Manager', 'A professional task management system with team collaboration features. Built using MERN stack.', 'Productivity', 'Mike Johnson', 'https://images.unsplash.com/photo-1557425493-6f90ae4659fc?auto=format&fit=crop&w=800&q=60'),

('Fitness Tracker', 'Mobile-first fitness tracking application that monitors workouts, nutrition, and progress. Uses React Native.', 'Health & Fitness', 'Sarah Wilson', 'https://images.unsplash.com/photo-1571019613914-85f342c1d1fc?auto=format&fit=crop&w=800&q=60'),

('Social Media Dashboard', 'Comprehensive social media management dashboard with analytics and scheduling capabilities.', 'Social Media', 'Alex Brown', 'https://images.unsplash.com/photo-1556742049-908d9d7c4f48?auto=format&fit=crop&w=800&q=60'),

('Online Learning Platform', 'Educational platform featuring video courses, quizzes, and progress tracking. Built with Next.js.', 'Education', 'Emily Clark', 'https://images.unsplash.com/photo-1600195077075-d99c9d0b3c69?auto=format&fit=crop&w=800&q=60'),

('Recipe Finder', 'Smart recipe recommendation system based on available ingredients. Uses AI for suggestions.', 'Food & Cooking', 'David Lee', 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=60'),

('Budget Tracker', 'Personal finance management app with expense tracking and budget planning features.', 'Finance', 'Lisa Anderson', 'https://images.unsplash.com/photo-1565372624876-f0f621d11f4b?auto=format&fit=crop&w=800&q=60'),

('Smart Home Controller', 'IoT-based home automation system with mobile app control. Integration with popular smart home devices.', 'IoT', 'Tom Wilson', 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=60'),

('Portfolio Generator', 'Automated portfolio website generator for creative professionals. Features customizable templates.', 'Design Tools', 'Rachel Green', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60');

-- Inserting dummy cart items for various users
INSERT INTO cart (user_id, project_id) VALUES
(1, 1),  -- User 1 added E-commerce Platform
(1, 3),  -- User 1 added Task Manager
(2, 2),  -- User 2 added Weather App
(2, 5),  -- User 2 added Social Media Dashboard
(3, 4),  -- User 3 added Fitness Tracker
(3, 7),  -- User 3 added Recipe Finder
(4, 6),  -- User 4 added Online Learning Platform
(4, 8),  -- User 4 added Budget Tracker
(5, 9),  -- User 5 added Smart Home Controller
(5, 10); -- User 5 added Portfolio Generator