// import {Link} from "react-router";
//
// function TokenDashboard({ tokens }) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//             {tokens.map((token) => (
//                 <div
//                     key={token.id}
//                     className="w-[200px] h-[200px] bg-white shadow-md rounded-lg p-4 border border-gray-200 transition hover:shadow-lg hover:bg-gray-50 flex flex-col justify-between"
//                 >
//                     <div>
//                         <h1 className="text-lg font-semibold text-gray-800 mb-2 truncate">{token.nameToken}</h1>
//                         <p className="text-sm text-gray-600 line-clamp-3">{token.tigger}</p>
//                     </div>
//                     <Link
//                         to={`/details/${token.id}`}
//                         className="text-blue-500 hover:underline text-sm mt-auto"
//                     >
//                         Detail
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// export default TokenDashboard;
