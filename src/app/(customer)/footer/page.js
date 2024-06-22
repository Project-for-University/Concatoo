export default function Footer(){
    return (
        <footer className="bg-emerald-50 py-6 mt-24 text-center">
            <p className="text-emerald-700">&copy; 2024 Pintu Konser. Semua Hak Cipta Dilindungi.</p>
            <p className="mt-4">
                <a href="/privacy-policy" className="text-emerald-700 hover:text-emerald-800 mx-2">Kebijakan Privasi</a>
                <a href="/terms-of-service" className="text-emerald-700 hover:text-emerald-800 mx-2">Syarat dan Ketentuan</a>
                <a href="/contact-us" className="text-emerald-700 hover:text-emerald-800 mx-2">Hubungi Kami</a>
            </p>
        </footer>
    )
}