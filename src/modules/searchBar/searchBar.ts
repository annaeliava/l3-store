import { View } from "../../utils/view";
import html from './searchBar.tpl.html';
import { ViewTemplate } from "../../utils/viewTemplate";
import { SearchSuggestion } from "../searchSuggestion/searchSuggestion";

export class SearchBar {
    view: View;
    texts: Array<string>;

    constructor() {
        this.texts = [];
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
    }

    update(texts: Array<string>) {
        this.texts = texts;
        this.render();
    }

    render() {
        this.view.texts.innerHTML = '';

        this.texts.forEach((text) => {
            if (this.texts.length == 3) {
                if (text == this.texts[0]) {
                    const textComp = new SearchSuggestion(text, ',', true);
                    textComp.render();
                    textComp.attach(this.view.texts);
                } else if (text == this.texts[1]) {
                    const textComp = new SearchSuggestion(text, 'или', false);
                    textComp.render();
                    textComp.attach(this.view.texts);
                } else {
                    const textComp = new SearchSuggestion(text, '', false);
                    textComp.render();
                    textComp.attach(this.view.texts);
                }
            }
        });
    }
}