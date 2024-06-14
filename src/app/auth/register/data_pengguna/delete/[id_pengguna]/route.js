

export async function DELETE({ params }) {

    try {
        console.log(params.id_pengguna);
        // const del = await prisma.user.delete({
        //     where: {
        //         id_user: params.id_pengguna
        //     }
        // })
        // if (del) {
        //     // Update cached posts
        //     console.log('berhasil ');

        // }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
