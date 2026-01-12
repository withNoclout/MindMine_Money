export default function BrowsePage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Explore Content</h1>
                <p className="text-gray-400">Discover top-rated educational materials tailored for you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="aspect-video bg-black/40 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                            <span className="text-gray-600 text-xs uppercase tracking-widest font-bold z-10">Thumbnail</span>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white text-xs font-bold">Preview</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">Physics</span>
                            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                                ★ 4.8
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">Advanced Quantum Mechanics</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">A deep dive into the principles of quantum superposition and entanglement.</p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                                <span className="text-xs text-gray-400">Dr. Somchai</span>
                            </div>
                            <span className="font-bold text-white">150 Credits</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
