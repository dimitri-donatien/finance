import { Show } from 'solid-js';

import { FaSolidArrowTrendUp } from 'solid-icons/fa'
import { FaSolidArrowTrendDown } from 'solid-icons/fa'

import "@/scss/components/card.scss"

type CardProps = {
    title: string;
    amount: number;
    percentage: number;
}

function Card(props: CardProps) {
    return (
        <div class="card">
            <p class="card-title">{props.title}</p>
            <div class="card-amount">
                <p class="card-text">{props.amount}€</p>
                <small class="card-percentage">
                    {props.percentage}%
                    <Show when={props.percentage > 20} fallback={<FaSolidArrowTrendDown />}>
                        <FaSolidArrowTrendUp />
                    </Show>
                </small>
            </div>
        </div>
    );
}

export default Card;