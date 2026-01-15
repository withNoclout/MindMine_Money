import PDFAnalyzer from '@/components/upload/PDFAnalyzer';

export default function PDFDemoPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-xl w-full">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Local AI Analysis Demo</h1>
                <p className="text-center text-gray-600 mb-8">
                    Upload a study note (PDF) to test zero-cost topic detection.
                    <br />
                    <span className="text-xs bg-yellow-100 px-2 py-1 rounded-full text-yellow-800">
                        Runs 100% on your device
                    </span>
                </p>

                <PDFAnalyzer />

                <div className="mt-8 text-center text-xs text-gray-400">
                    Powered by pdfjs-dist & Transformers.js (WebAssembly)
                </div>
            </div>
        </div>
    );
}
