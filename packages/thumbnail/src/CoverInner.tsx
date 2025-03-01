/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2021 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import * as React from 'react';
import { getPage, PdfJs, Spinner } from '@react-pdf-viewer/core';

export const CoverInner: React.FC<{
    getPageIndex?({ numPages }: { numPages: number }): number;
    renderSpinner?: () => React.ReactElement;
    doc: PdfJs.PdfDocument;
}> = ({ getPageIndex, renderSpinner, doc }) => {
    const [src, setSrc] = React.useState('');
    const containerRef = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        const containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }

        const { numPages } = doc;
        const targetPage = getPageIndex ? getPageIndex({ numPages }) : 0;
        const normalizePage = Math.max(0, Math.min(targetPage, numPages - 1));
        getPage(doc, normalizePage).then((page) => {
            const viewport = page.getViewport({ scale: 1 });
            const w = viewport.width;
            const h = viewport.height;

            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            const canvasContext = canvas.getContext('2d', {
                alpha: false,
            }) as CanvasRenderingContext2D;

            const containerWidth = containerEle.clientWidth;
            const containerHeight = containerEle.clientHeight;

            const scaled = Math.min(containerWidth / w, containerHeight / h);
            const canvasWidth = scaled * w;
            const canvasHeight = scaled * h;

            canvas.height = canvasHeight;
            canvas.width = canvasWidth;
            canvas.style.opacity = '0';

            const renderViewport = page.getViewport({
                rotation: 0,
                scale: scaled,
            });

            const renderTask = page.render({ canvasContext, viewport: renderViewport });
            renderTask.promise.then(
                (): void => setSrc(canvas.toDataURL()),
                (): void => {
                    /**/
                }
            );
        });
    }, []);

    return src ? (
        <img className="rpv-thumbnail__cover-image" data-testid="thumbnail__cover-image" src={src} />
    ) : (
        <div className="rpv-thumbnail__cover-loader" ref={containerRef}>
            {renderSpinner ? renderSpinner() : <Spinner />}
        </div>
    );
};
