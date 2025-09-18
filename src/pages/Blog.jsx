import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import {
  BookOpenIcon,
  DocumentTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FaNewspaper, FaLeaf, FaDumbbell, FaBrain } from "react-icons/fa6";

const blogPosts = [
  {
    title: "Sog‘lom turmush tarzi",
    category: "Hayot tarzi",
    icon: <FaLeaf className="inline w-5 h-5 mr-1" />,
    content:
      "Har kuni kichik odatlarni qo‘shing va sog‘lom hayotga qadam qo‘ying. Masalan, ertalab 10 daqiqa meditatsiya yoki qisqa yurish foydali.",
  },
  {
    title: "Ovqatlanish rejasi",
    category: "Ovqatlanish",
    icon: <BookOpenIcon className="inline w-5 h-5 mr-1" />,
    content:
      "Balanslangan ovqatlanish energiyangizni oshiradi. Sabzavot va mevalarni yetarli miqdorda iste'mol qilishni unutmang.",
  },
  {
    title: "Fitness va mashqlar",
    category: "Fitness",
    icon: <FaDumbbell className="inline w-5 h-5 mr-1" />,
    content:
      "Har kuni minimal 30 daqiqa jismoniy faollik sog‘lom yurak va mushaklar uchun zarur.",
  },
  {
    title: "Ruhiy salomatlik",
    category: "Ruhiy salomatlik",
    icon: <FaBrain className="inline w-5 h-5 mr-1" />,
    content:
      "Stressni kamaytirish va ongni tinchlantirish uchun meditatsiya va tabiatda sayr qilishni odat qiling.",
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <PageWrapper title="Blog">
      <div className="grid gap-6 md:grid-cols-2 p-4">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            whileHover={{ scale: 1.03 }}
            className="p-5 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg cursor-pointer border border-gray-700"
          >
            <h2 className="mb-2 text-xl font-bold text-white drop-shadow-md">
              {post.icon} {post.title}
            </h2>
            <span className="text-sm font-semibold text-gray-300 flex items-center">
              <DocumentTextIcon className="w-4 h-4 mr-1" />
              {post.category}
            </span>
            <p className="mt-2 text-gray-200 line-clamp-3">{post.content}</p>
            <button
              onClick={() => setSelectedPost(post)}
              className="px-4 py-2 mt-3 text-white transition bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center"
            >
              <FaNewspaper className="w-4 h-4 mr-2" /> Batafsil o‘qish
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="p-6 bg-gray-900/95 backdrop-blur-md rounded-2xl max-w-lg mx-4 shadow-xl border border-gray-700"
            >
              <h2 className="mb-2 text-2xl font-bold text-white drop-shadow-md flex items-center">
                <BookOpenIcon className="w-6 h-6 mr-2" />
                {selectedPost.title}
              </h2>
              <span className="text-sm font-semibold text-gray-300 flex items-center">
                <DocumentTextIcon className="w-4 h-4 mr-1" />{" "}
                {selectedPost.category}
              </span>
              <p className="mt-4 text-gray-200">{selectedPost.content}</p>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 mt-6 text-white bg-gray-700 rounded-lg hover:bg-gray-600 flex items-center"
              >
                <XMarkIcon className="w-5 h-5 mr-1" /> Yopish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
