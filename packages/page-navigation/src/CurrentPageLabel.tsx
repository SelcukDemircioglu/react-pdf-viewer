/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import type { Store } from '@react-pdf-viewer/core';

import { useCurrentPage } from './useCurrentPage';
import { useNumberOfPages } from './useNumberOfPages';
import { usePageLabels } from './usePageLabels';
import type { StoreProps } from './types/StoreProps';

export interface RenderCurrentPageLabelProps {
    currentPage: number;
    numberOfPages: number;
    pageLabel: string;
}

type RenderCurrentPageLabel = (props: RenderCurrentPageLabelProps) => React.ReactElement;

export interface CurrentPageLabelProps {
    children?: RenderCurrentPageLabel;
}

export const CurrentPageLabel: React.FC<{
    children?: RenderCurrentPageLabel;
    store: Store<StoreProps>;
}> = ({ children, store }) => {
    const labels = usePageLabels(store);
    const { currentPage } = useCurrentPage(store);
    const { numberOfPages } = useNumberOfPages(store);

    const defaultChildren = (props: RenderCurrentPageLabelProps) => <>{props.currentPage + 1}</>;
    const render = children || defaultChildren;

    return render({
        currentPage,
        numberOfPages,
        pageLabel: labels.length === numberOfPages ? labels[currentPage] : '',
    });
};
