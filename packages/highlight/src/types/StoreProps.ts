/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { HighlightState } from '../HighlightState';

export interface StoreProps {
    getPageElement?(pageIndex: number): HTMLElement | null;
    getPagesContainer?(): HTMLElement;
    rotation?: number;
    highlightState: HighlightState;
}
