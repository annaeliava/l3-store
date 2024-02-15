import { View } from "../../utils/view";
import html from './searchSuggestion.tpl.html';
import { ViewTemplate } from "../../utils/viewTemplate";

export class SearchSuggestion {
    view: View;
    text: string;
    detail: string;
    punctuation: boolean;

    constructor(text: string, detail: string, punctuation: boolean) {
        this.text = text;
        this.detail = detail;
        this.punctuation = punctuation;
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    render() {
        if (this.punctuation) {
            this.view.root.classList.add('suggestion__container__punctuation');
        } else {
            this.view.root.classList.add('suggestion__container__conjunction');
        }

        this.view.text.innerText = this.text;
        this.view.detail.innerText = this.detail;
    }
}