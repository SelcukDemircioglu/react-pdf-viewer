/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';

import { SpecialZoomLevel } from '../structs/SpecialZoomLevel';
import type { ThemeContextProps } from '../theme/ThemeContext';
import type { PdfJs } from '../types/PdfJs';
import type { Slot } from './Slot';

export interface RenderViewer {
    containerRef: React.RefObject<HTMLDivElement>;
    doc: PdfJs.PdfDocument;
    pageHeight: number;
    pageWidth: number;
    rotation: number;
    slot: Slot;
    themeContext: ThemeContextProps;
    openFile(file: File): void;
    jumpToPage(page: number): void;
    rotate(degree: number): void;
    zoom(level: number | SpecialZoomLevel): void;
}
