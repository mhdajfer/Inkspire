import { BlogPost } from "@/Types/blog";

export const blogs: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Modern Web Development",
    excerpt:
      "An in-depth look at the latest trends and technologies shaping the future of web development, including server components, edge computing, and more.",
    date: "January 21, 2024",
    author: "Sarah Johnson",
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Art of Technical Writing",
    excerpt:
      "Discover the key principles and best practices for creating clear, concise, and effective technical documentation that resonates with your audience.",
    date: "January 20, 2024",
    author: "Michael Chen",
    category: "Writing",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Building Scalable Applications",
    excerpt:
      "Learn the architectural patterns and practices that help you create applications that can grow with your user base while maintaining performance.",
    date: "January 19, 2024",
    author: "Alex Rivera",
    category: "Architecture",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    readTime: "7 min read",
  },
];
