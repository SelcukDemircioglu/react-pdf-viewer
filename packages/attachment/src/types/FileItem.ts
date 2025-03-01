/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import type { PdfJs } from '@react-pdf-viewer/core';

export interface FileItem {
    data: PdfJs.FileData;
    fileName: string;
}
