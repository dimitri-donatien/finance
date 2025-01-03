import { For } from "solid-js"
import { A } from "@solidjs/router"

import { FiHome } from 'solid-icons/fi'
import { BiRegularWallet } from 'solid-icons/bi'
import { CgArrowsExchange } from 'solid-icons/cg'
import { OcReport2 } from 'solid-icons/oc'

import "@/scss/components/navbar.scss"

function Navbar() {

    const items = [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: <FiHome />
        },
        {
            name: "Transactions",
            url: "/transactions",
            icon: <CgArrowsExchange />
        },
        {
            name: "Budgets",
            url: "/budgets",
            icon: <BiRegularWallet />
        },
        // {
        //     name: "Reports",
        //     url: "/reports",
        //     icon: <OcReport2 />
        // },
    ]

    return (
        <nav class="navbar">
            <A href="/" class="navbar-brand">Solid Money</A>
            <ul class="navbar__list">
                <For each={items}>
                    {(item) => (
                        <li class="navbar__item">
                            <A href={item.url} class="navbar__link" end>
                                {item.icon}
                                {item.name}
                            </A>
                        </li>
                    )}
                </For>
            </ul>
        </nav>
    );
}

export default Navbar;