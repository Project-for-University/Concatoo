// import { MdAddCircleOutline, MdCorporateFare } from "react-icons/md";
// import Link from "next/link";
// import { usePathname } from 'next/navigation'

// export default function Sidebar() {
//   const pathname = usePathname()
//   const isActive = (href) => router.pathname === href ? 'active' : '';
//   return (
//     <div className=" bg-white text-gray-700 w-64 h-screen border rounded-3xl m-4">
//       <div className="flex flex-col items-start p-4 space-y-4">
//       <Link href={`/dashboard`} className={`flex items-center w-full p-2 rounded-lg hover:bg-emerald-100 ${pathname === '/dashboard' ? 'text-emerald-600 bg-emerald-100' : ''}`}>
//           <MdCorporateFare className="mr-4" size={24} />
//           <span>Dashboard</span>
//         </Link>
//         <Link href={`/acara`} className={`flex items-center w-full p-2 rounded-lg hover:bg-emerald-100 ${pathname === '/acara' ? 'text-emerald-600 bg-emerald-100' : ''}`}>
//           <MdAddCircleOutline className="mr-4" size={24} />
//           <span>Acara</span>
//           </Link>
//       </div>
//     </div>
//   );
// }

