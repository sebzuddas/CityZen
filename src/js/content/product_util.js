export function is_product_page() {
    return document.getElementById("productTitle") !== null
}

export function get_product_id() {
    return document.getElementById("ASIN").value;
}

export function get_category_id() {
    const categories_wrapper = document.getElementById("wayfinding-breadcrumbs_feature_div");
    if (categories_wrapper === null) {
        return null;
    }

    const categories = categories_wrapper.getElementsByClassName("a-link-normal a-color-tertiary");

    if (categories.length === 0) {
        return null;
    }

    const category_url = new URL(categories[categories.length - 1].href);

    return category_url.searchParams.get("node");
}

