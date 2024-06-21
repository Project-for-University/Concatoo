// pages/coming-soon.js
import Head from 'next/head';

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Coming Soon</title>
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-emerald-600">Segera Hadir</h1>
        <p className="text-gray-600 mb-8">Kami lagi sibuk banget nyiapin sesuatu yang gokil buat kamu. Pantengin terus, ya!</p>
        <div className="flex justify-center">
        </div>
        <div className="mt-8">
          <p className="text-gray-500">Jangan lupa ikutin terus!</p>
          </div>
        </div>
      </div>
  );
}
