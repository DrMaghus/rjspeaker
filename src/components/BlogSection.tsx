import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  date: string;
  link: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://blog.rjohnsonh.com/wp-json/wp/v2/posts?per_page=4');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <section id="blog" data-section="blog" className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#21334E' }}>
            Últimos del Blog
          </h2>
          <p className="text-lg md:text-xl" style={{ color: '#64748B' }}>
            Insights y reflexiones sobre experiencia digital, analítica y customer experience
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse"
              >
                <div className="h-6 bg-slate-200 rounded mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-lg mb-4" style={{ color: '#64748B' }}>
              No se pudieron cargar los artículos del blog.{' '}
              <a 
                href="https://blog.rjohnsonh.com" 
                className="font-semibold hover:underline"
                style={{ color: '#F97316' }}
              >
                Visita blog.rjohnsonh.com
              </a>
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <h3 
                  className="font-bold text-lg mb-3 transition-colors hover:cursor-pointer"
                  style={{ color: '#21334E' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#4495DE'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#21334E'}
                >
                  <a href={post.link} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </h3>
                
                <p className="text-sm mb-4" style={{ color: '#64748B' }}>
                  {formatDate(post.date)}
                </p>

                <a 
                  href={post.link}
                  className="inline-flex items-center text-sm font-semibold transition-colors"
                  style={{ color: '#F97316' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ea580c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#F97316'}
                  data-event="cta_click"
                  data-cta-name={`blog_post_${post.id}`}
                  data-cta-location="blog"
                >
                  Leer más →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
