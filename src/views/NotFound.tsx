import { MetaProvider, Title, Meta } from "@solidjs/meta"

function NotFound() {
    return (
        <>
            <MetaProvider>
                {/* Primary Meta Tags */}
                <Title>404 Not found</Title>
                {/* Open Graph / Facebook */}
                <Meta property="og:type" content="website" />
                <Meta property="og:title" content="404 Not found" />
                <Meta property="og:image" content="" />
                {/* Twitter  */}
                <Meta property="twitter:card" content="summary_large_image" />
                <Meta property="twitter:url" content="" />
                <Meta property="twitter:title" content="404 Not found" />
                <Meta property="twitter:image" content="" />
            </MetaProvider>

            <div class="grid h-screen place-content-center bg-white px-4">
                <h1 class="uppercase tracking-widest text-gray-500">404 | Not Found</h1>
            </div>

        </>
    )
}

export default NotFound