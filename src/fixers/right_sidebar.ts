import {IMutationAwareFixer} from "./base.js";
import {SettingsObject} from "../settings.js";

const MASK_ROSE_BANNER_SELECTOR = "div[class='travel'] a[target='_blank'][rel='noopener noreferrer'] img"
const SNIPPET_CONTAINER_SELECTOR = "div[class='snippet']"

export class RightSidebarFixer implements IMutationAwareFixer {
    private removeMaskBanner = false
    private removeSnippets = false

    applySettings(settings: SettingsObject): void {
        this.removeMaskBanner = settings.remove_mask_banner as boolean;
        this.removeSnippets = settings.remove_sidebar_snippets as boolean;
    }

    onNodeAdded(node: HTMLElement): void {
        if (this.removeMaskBanner) {
            const banner = node.querySelector(MASK_ROSE_BANNER_SELECTOR);
            banner?.parentElement?.remove();
        }

        if (this.removeSnippets) {
            const snippetContainer = node.querySelector(SNIPPET_CONTAINER_SELECTOR);
            snippetContainer?.remove();
        }
    }

    onNodeRemoved(_node: HTMLElement): void {
    // Do nothing if DOM node is removed.
}

    checkEligibility(_node: HTMLElement): boolean {
        return this.removeMaskBanner || !this.removeSnippets;
    }
}
