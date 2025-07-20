interface ProfilePageProps {
    params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { id } = await params;  // Await the params

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page {id}</p>
        </div>
    );
}
