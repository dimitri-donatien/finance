import TransactionTable from "@/components/TransactionTable";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";

function Transactions() {

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

            <section class="transactions">
                <h2 class="header-title">Transactions</h2>

                {/* Add the TransactionsList component here */}
                <TransactionTable />
            </section>
        </>
    )
}

export default Transactions