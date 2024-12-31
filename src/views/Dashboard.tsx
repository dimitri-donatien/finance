import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";

import Card from "@/components/Card"

import "@/scss/pages/dashboard.scss"

function Dashboard() {

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

            <section class="dashboard">
                <h1 class="header-title">Dashboard</h1>
                <section class="cards">
                    <Card title="Total Balance" amount={10000} percentage={50} />
                    <Card title="Monthly Income" amount={10000} percentage={50} />
                    <Card title="Monthly Expense" amount={10000} percentage={50} />
                    <Card title="Monthly Savings" amount={10000} percentage={50} />
                </section>

                <section class="analytics">
                    <h2 class="header-title">Analytics</h2>
                    {/* A graph analyzing monthly income and expenses over the week, month and year. */}
                    <div class="chart"></div>
                    {/* An analysis chart that shows the percentage of each category. */}
                    <div class="chart"></div>
                </section>

                <section class="transactions">
                    <h2 class="header-title">Transactions</h2>
                </section>
            </section>
        </>
    )
}

export default Dashboard