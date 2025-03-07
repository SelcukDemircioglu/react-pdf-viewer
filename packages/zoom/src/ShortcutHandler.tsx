/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { isMac } from '@react-pdf-viewer/core';
import type { Store } from '@react-pdf-viewer/core';

import { decrease, increase } from './zoomingLevel';
import type { StoreProps } from './types/StoreProps';

export const ShortcutHandler: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>;
    store: Store<StoreProps>;
}> = ({ containerRef, store }) => {
    const keydownHandler = (e: KeyboardEvent) => {
        if (e.shiftKey || e.altKey) {
            return;
        }
        const isCommandPressed = isMac() ? e.metaKey : e.ctrlKey;
        if (!isCommandPressed) {
            return;
        }

        const containerEle = containerRef.current;
        if (!containerEle || !document.activeElement || !containerEle.contains(document.activeElement)) {
            return;
        }

        const zoom = store.get('zoom');
        if (!zoom) {
            return;
        }

        const scale = store.get('scale') || 1;
        let newScale = 1;
        switch (e.key) {
            case '-':
                newScale = decrease(scale);
                break;
            case '=':
                newScale = increase(scale);
                break;
            case '0':
                newScale = 1;
                break;
            default:
                newScale = scale;
                break;
        }

        if (newScale !== scale) {
            e.preventDefault();
            zoom(newScale);
        }
    };

    React.useEffect(() => {
        const containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }

        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [containerRef.current]);

    return <></>;
};
