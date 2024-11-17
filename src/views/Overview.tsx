import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";

// import Logout from "@/components/Logout";

function Overview() {

    return (
        <>
            <MetaProvider>
                {/* Primary Meta Tags */}
                <Title></Title>
                <Link rel="canonical" href="" />
                <Meta
                    name="description"
                    content=""
                />
                {/* Open Graph / Facebook */}
                <Meta property="og:type" content="website" />
                <Meta property="og:url" content="" />
                <Meta property="og:title" content="" />
                <Meta
                    property="og:description"
                    content=""
                />
                <Meta property="og:image" content="" />

                {/* Twitter  */}
                <Meta property="twitter:card" content="summary_large_image" />
                <Meta property="twitter:url" content="" />
                <Meta property="twitter:title" content="" />
                <Meta
                    property="twitter:description"
                    content=""
                />
                <Meta property="twitter:image" content="" />
            </MetaProvider>

            <div class="flex flex-col items-center justify-center h-screen">
                <h1 class="text-4xl font-bold">Overview</h1>
            </div>

            {/* <Logout /> */}

        </>
    )
}

export default Overview