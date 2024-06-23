import { SlCheck, SlClose } from "react-icons/sl";

export default function List_seller(params) {
    return(
        <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
            <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">No</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">Name</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">Email</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-800 tracking-wider">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">1</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">John Doe</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">john@example.com</td>
                <td className="flex px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <button className="flex px-3 items-center py-2 text-sm rounded-md font-medium text-center text-rose-500 border border-rose-500 hover:bg-gardient-to-br focus:ring-4 focus:outline-none focus:ring-rose-300"><SlClose className="mr-2" /> Non-Aktifkan</button>
                    <button className="flex ml-2 px-3 items-center py-2 text-sm rounded-md font-medium text-center text-emerald-500 border border-emerald-600 hover:bg-gardient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300"><SlCheck className="mr-2" /> Aktifkan</button>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    )
}