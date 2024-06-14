import { redirect } from 'next/navigation';// kade salah import
import { comment } from '../data';
export async function GET(request, { params }) {
    const id = parseInt(params.id);

    // if (id > comment.length) { // If the ID is out of range, redirect to the comments page
    //     }


    // kalo pake try catch eror 
    return redirect("/acara");


    const comments = comment.find((comment) => comment.id === id); // Find the comment with the matching ID
    return new Response(JSON.stringify(comments)); // Return the comment as a JSON response
}
