import {is_product_page} from "./product_util";
import counter_html from './../../counter_html.html'

let up_votes = 0;
let down_votes = 0;
let score = 0;

export function inject_counter() {
    if (!is_product_page()) {
        return;
    }

    const right_column = document.getElementById("rightCol");
    const counter_box = document.createElement("div");
    const counter_box_inner = document.createElement("div");

    counter_box.classList.add("a-box");
    counter_box.style.marginBottom = "10px";

    counter_box_inner.classList.add("a-box-inner")

    counter_box_inner.innerHTML = counter_html

    counter_box.append(counter_box_inner);
    right_column.prepend(counter_box);

    // Loading data
    fetch("https://api.npoint.io/1287accf72df171aa884")
        .then(response => response.json())
        .then(data => {
            up_votes = data["upvotes"];
            down_votes = data["downvotes"];
            score = data["score"];

            update_votes()

            const up_vote_button = document.getElementById("sus_up_vote");
            const down_vote_button = document.getElementById("sus_down_vote");

            up_vote_button.addEventListener("click", up_vote)
            down_vote_button.addEventListener("click", down_vote)
        });
}

function update_votes() {
    const score_dom_element = document.getElementById("sus_score");
    const up_votes_dom_element = document.getElementById("sus_up_votes");
    const down_votes_dom_element = document.getElementById("sus_down_votes");

    score_dom_element.innerText = score + "";
    up_votes_dom_element.innerText = up_votes + "";
    down_votes_dom_element.innerText = down_votes + ""
}

function up_vote() {
    up_votes += 1
    vote(1)
}

function down_vote() {
    down_votes += 1
    vote(-1)
}

function vote(delta_score) {
    score += delta_score;
    update_votes()
}
