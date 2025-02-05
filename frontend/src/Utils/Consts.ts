import { IBlog } from "@/Types/IBlog";

export const blogs: IBlog[] = [
  {
    _id: "1",
    title: "The Power of Positive Thinking",
    content:
      "Discover how cultivating a positive mindset can transform your life.",
    author: "John Doe",
    tags: ["mindfulness", "motivation", "happiness"],
    coverImage: "https://renderform.io/blog/post-cover-blue.png",
    createdAt: "2024-07-05T10:30:00Z",
    updatedAt: "2024-07-05T10:30:00Z",
  },
  {
    _id: "2",
    title: "Unlocking Your Creative Potential",
    content:
      "Explore techniques to ignite your creativity and unleash your inner artist.",
    author: "Jane Smith",
    tags: ["creativity", "art", "inspiration"],
    coverImage: "https://renderform.io/blog/post-cover-blue.png",
    createdAt: "2024-07-10T15:15:00Z",
    updatedAt: "2024-07-10T15:15:00Z",
  },
  {
    _id: "3",
    title: "The Importance of Mindfulness in Daily Life",
    content:
      "Learn how to bring mindfulness into your everyday routines for greater peace and well-being.",
    author: "David Lee",
    tags: ["mindfulness", "meditation", "stress management"],
    coverImage: "https://renderform.io/blog/post-cover-blue.png",
    createdAt: "2024-07-15T09:00:00Z",
    updatedAt: "2024-07-15T09:00:00Z",
  },
  {
    _id: "4",
    title: "Healthy Habits for a Better You",
    content:
      "Discover simple yet effective healthy habits to improve your physical and mental health.",
    author: "Sarah Jones",
    tags: ["health", "fitness", "nutrition"],
    coverImage: "https://renderform.io/blog/post-cover-blue.png",
    createdAt: "2024-07-20T12:30:00Z",
    updatedAt: "2024-07-20T12:30:00Z",
  },
  {
    _id: "5",
    title: "The Art of Storytelling",
    content:
      "Explore the power of storytelling and how to craft compelling narratives.",
    author: "Michael Brown",
    tags: ["storytelling", "writing", "communication"],
    coverImage: "https://renderform.io/blog/post-cover-blue.png",
    createdAt: "2024-07-25T16:00:00Z",
    updatedAt: "2024-07-25T16:00:00Z",
  },
  {
    _id: "6",
    title: "Travel the World: A Guide to Budget Travel",
    content:
      "Tips and tricks for exploring the world without breaking the bank.",
    author: "Emily Davis",
    tags: ["travel", "budgeting", "adventure"],
    coverImage: "https://renderform.io/blog/post-cover-blue.png",
    createdAt: "2024-07-30T11:00:00Z",
    updatedAt: "2024-07-30T11:00:00Z",
  },
];

export const S3URL = import.meta.env.S3_URL;
