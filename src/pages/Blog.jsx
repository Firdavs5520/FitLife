import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const blogPosts = [
  {
    title: "Sog‘lom turmush tarzi",
    category: "Hayot tarzi",
    content:
      "Har kuni kichik odatlarni qo‘shing va sog‘lom hayotga qadam qo‘ying. Masalan, ertalab 10 daqiqa meditatsiya yoki qisqa yurish foydali.",
  },
  {
    title: "Ovqatlanish rejasi",
    category: "Ovqatlanish",
    content:
      "Balanslangan ovqatlanish energiyangizni oshiradi. Sabzavot va mevalarni yetarli miqdorda iste'mol qilishni unutmang.",
  },
  {
    title: "Fitness va mashqlar",
    category: "Fitness",
    content:
      "Har kuni minimal 30 daqiqa jismoniy faollik sog‘lom yurak va mushaklar uchun zarur.",
  },
  {
    title: "Ruhiy salomatlik",
    category: "Ruhiy salomatlik",
    content:
      "Stressni kamaytirish va ongni tinchlantirish uchun meditatsiya va tabiatda sayr qilishni odat qiling.",
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <PageWrapper title="📝 Blog">
      <div className="grid gap-6 md:grid-cols-2 p-4">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            whileHover={{ scale: 1.05 }}
            className="p-5 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg cursor-pointer"
          >
            <h2 className="mb-2 text-xl font-bold text-green-700">
              {post.title}
            </h2>
            <span className="text-sm font-semibold text-blue-700">
              {post.category}
            </span>
            <p className="mt-2 text-gray-700 line-clamp-3">{post.content}</p>
            <button
              onClick={() => setSelectedPost(post)}
              className="px-4 py-2 mt-3 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
            >
              Batafsil o‘qish
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="p-6 bg-white/90 backdrop-blur-md rounded-2xl max-w-lg mx-4 shadow-xl"
            >
              <h2 className="mb-2 text-2xl font-bold text-green-700">
                {selectedPost.title}
              </h2>
              <span className="text-sm font-semibold text-blue-700">
                {selectedPost.category}
              </span>
              <p className="mt-4 text-gray-700">{selectedPost.content}</p>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 mt-6 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                ✖ Yopish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
