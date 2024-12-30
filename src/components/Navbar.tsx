import { Show, For, createSignal } from "solid-js"
import { A } from "@solidjs/router"
import { user } from "@/stores/authStore"

import { FiHome } from 'solid-icons/fi'
import { BiRegularWallet } from 'solid-icons/bi'
import { CgArrowsExchange } from 'solid-icons/cg'
import { OcReport2 } from 'solid-icons/oc'
import { FiLogOut } from 'solid-icons/fi'
import { FiLogIn } from 'solid-icons/fi'

import "@/scss/components/navbar.scss"

function Navbar() {

    const [isAuth, setIsAuth] = createSignal(!!user());

    const items = [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: <FiHome />
        },
        {
            name: "Budgets",
            url: "/budgets",
            icon: <BiRegularWallet />
        },
        {
            name: "Transactions",
            url: "/transactions",
            icon: <CgArrowsExchange />
        },
        {
            name: "Reports",
            url: "/reports",
            icon: <OcReport2 />
        },
        {
            name: "Logout",
            url: "/",
            icon: <FiLogOut />
        },
        {
            name: "Login",
            url: "/",
            icon: <FiLogIn />
        }
    ]

    return (
        <nav>
            <ul>
                <For each={items}>
                    {({ name, url, icon }) => (
                        <li>
                            <Show when={isAuth() && name !== "Login"}>
                                <A href={url}>
                                    {icon}
                                    {name}
                                </A>
                            </Show>
                        </li>
                    )}
                </For>
            </ul>
        </nav>
    );
}

export default Navbar;